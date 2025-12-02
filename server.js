// Minimal Express backend for KRREVIVEÉLITE Universe
// Provides endpoints:
// - GET /api/leaderboard  -> returns leaderboard
// - POST /api/leaderboard -> add score
// - POST /api/checkout    -> starts a checkout (stub/placeholder)
// - POST /api/ai/resume   -> proxy to AI provider (stub if no key)

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import DB helpers
const DB = require('./db');

// Initialize Stripe if secret is configured
let stripe = null;
if (process.env.STRIPE_SECRET) {
  try { stripe = require('stripe')(process.env.STRIPE_SECRET); }
  catch(e){ console.warn('Stripe module not available or failed to init', e.message); }
}

const DATA_DIR = path.join(__dirname, 'data');
const LB_FILE = path.join(DATA_DIR, 'leaderboard-server.json');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, {recursive:true});
if (!fs.existsSync(LB_FILE)) fs.writeFileSync(LB_FILE, JSON.stringify({leaders:[]}));

// Serve static site files (so server can serve entire site for local testing)
app.use('/', express.static(path.join(__dirname)));

app.get('/api/leaderboard', async (req,res)=>{
  try{
    const rows = await DB.getLeaderboard(50);
    res.json({leaders: rows});
  }catch(e){ res.status(500).json({error:'failed to read leaderboard', details: e.message}); }
});

app.post('/api/leaderboard', async (req,res)=>{
  try{
    const body = req.body || {};
    await DB.addScore(body.name||'Guest', Number(body.score)||0);
    res.json({ok:true});
  }catch(e){ res.status(500).json({error:'failed to write leaderboard', details: e.message}); }
});

// Checkout / subscription stub - replace with Stripe server integration in production
app.post('/api/checkout', async (req,res)=>{
  const domain = req.headers.origin || `http://localhost:${PORT}`;
  const client_id = (req.body && req.body.client_id) ? String(req.body.client_id) : null;
  if (stripe) {
    try{
      const success_url = `${domain}/?checkout=success&client_id=${encodeURIComponent(client_id||'')}`;
      const cancel_url = `${domain}/?checkout=cancel&client_id=${encodeURIComponent(client_id||'')}`;

      if (process.env.STRIPE_PRICE_ID) {
        const session = await stripe.checkout.sessions.create({
          mode: 'subscription',
          line_items: [ { price: process.env.STRIPE_PRICE_ID, quantity: 1 } ],
          success_url, cancel_url,
          client_reference_id: client_id
        });
        return res.json({url: session.url});
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: 'KRREVIVEÉLITE Premium' },
            unit_amount: 499
          },
          quantity: 1
        }],
        success_url, cancel_url,
        client_reference_id: client_id
      });
      return res.json({url: session.url});
    }catch(e){
      console.error('Stripe checkout create failed', e);
      return res.status(500).json({error:'stripe create session failed', details: e.message});
    }
  }

  // No stripe configured: persist simulated subscription server-side if client_id supplied
  if (client_id) {
    await DB.upsertSubscription(client_id, {is_premium:1});
    return res.json({sessionId: 'simulated_session_12345', message: 'Simulated checkout (no Stripe key configured)'});
  }

  return res.json({error:'no stripe configured and no client_id provided'});
});

// Optional webhook endpoint to receive Stripe events (configure STRIPE_WEBHOOK_SECRET)
app.post('/api/webhook', bodyParser.raw({type: 'application/json'}), async (req,res)=>{
  if (!process.env.STRIPE_WEBHOOK_SECRET || !stripe) return res.status(400).send('Webhook not configured');
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Checkout completed:', session.id, session.client_reference_id);
    const client_id = session.client_reference_id;
    
    // Check idempotency: has this webhook event already been processed?
    try{
      const recorded = await DB.recordWebhookEvent(event.id, event.type, client_id);
      if (recorded.already_recorded) {
        console.log('Webhook event already processed:', event.id);
        return res.json({received:true});
      }
    }catch(e){ console.error('Failed to record webhook event', e); }

    try{
      if (client_id) {
        await DB.upsertSubscription(client_id, {stripe_customer_id: session.customer, stripe_subscription_id: session.subscription || null, is_premium:1});
      }
    }catch(e){ console.error('Failed to persist subscription', e); }
  }

  res.json({received:true});
});

// Admin endpoints protected by X-ADMIN-TOKEN header matching env ADMIN_TOKEN
app.get('/api/admin/subscriptions', async (req,res)=>{
  const token = req.headers['x-admin-token'];
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) return res.status(401).json({error:'unauthorized'});
  try{
    // simple query to return subscriptions
    const sqlite3 = require('sqlite3').verbose();
    const dbfile = require('path').join(__dirname,'data','krrevive.db');
    const db = new sqlite3.Database(dbfile);
    db.all('SELECT client_id,stripe_customer_id,stripe_subscription_id,is_premium,created_at FROM subscriptions ORDER BY created_at DESC LIMIT 500', [], (err, rows)=>{
      if (err) return res.status(500).json({error:err.message});
      res.json({subscriptions: rows});
    });
  }catch(e){ res.status(500).json({error:e.message}); }
});

app.get('/api/admin/leaderboard', async (req,res)=>{
  const token = req.headers['x-admin-token'];
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) return res.status(401).json({error:'unauthorized'});
  try{
    const leaders = await DB.getLeaderboard(500);
    res.json({leaders});
  }catch(e){ res.status(500).json({error:e.message}); }
});

// Billing portal creation for a given client_id (requires Stripe configured and the subscription/customer to exist)
app.post('/api/billing-portal', async (req,res)=>{
  const token = req.headers['x-admin-token'];
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) return res.status(401).json({error:'unauthorized'});
  if (!stripe) return res.status(500).json({error:'stripe-not-configured'});
  try{
    const client_id = req.body && req.body.client_id;
    if (!client_id) return res.status(400).json({error:'client_id required'});
    const sub = await DB.getSubscription(client_id);
    if (!sub || !sub.stripe_customer_id) return res.status(404).json({error:'no stripe customer for client_id'});
    const return_url = req.headers.referer || (req.headers.origin || `http://localhost:${PORT}`);
    const session = await stripe.billingPortal.sessions.create({customer: sub.stripe_customer_id, return_url});
    res.json({url: session.url});
  }catch(e){ res.status(500).json({error:e.message}); }
});

// Auth endpoints for magic link flow
app.post('/api/auth/request-magic-link', async (req,res)=>{
  const email = (req.body && req.body.email || '').toLowerCase().trim();
  if (!email || !email.includes('@')) return res.status(400).json({error:'valid email required'});
  try{
    let cid = await DB.getUser(email);
    if (!cid) cid = {client_id: 'cid_'+Math.random().toString(36).slice(2,12)};
    const link = await DB.createMagicLink(email, cid.client_id);
    // In production, send this via email. For now, just return it (testing only).
    res.json({email, message: `Magic link created (test: ?token=${link.token}&email=${encodeURIComponent(email)})`});
  }catch(e){ res.status(500).json({error:e.message}); }
});

app.post('/api/auth/verify-magic-link', async (req,res)=>{
  const email = (req.body && req.body.email || '').toLowerCase().trim();
  const token = req.body && req.body.token;
  if (!email || !token) return res.status(400).json({error:'email and token required'});
  try{
    const user = await DB.verifyMagicLink(email, token);
    if (!user) return res.status(401).json({error:'invalid or expired token'});
    const session = await DB.createSession(user.id, user.client_id);
    res.json({email: user.email, client_id: user.client_id, session_token: session.session_token});
  }catch(e){ res.status(500).json({error:e.message}); }
});

app.get('/api/auth/me', async (req,res)=>{
  const session_token = req.headers['x-session-token'] || req.query.session_token;
  if (!session_token) return res.status(401).json({error:'session token required'});
  try{
    const user = await DB.verifySession(session_token);
    if (!user) return res.status(401).json({error:'invalid session'});
    const sub = await DB.getSubscription(user.client_id);
    res.json({email: user.email, client_id: user.client_id, is_premium: Boolean(sub && sub.is_premium)});
  }catch(e){ res.status(500).json({error:e.message}); }
});

app.post('/api/auth/logout', (req,res)=>{
  res.json({ok:true});
});

// Endpoint to get subscription status by client_id
app.get('/api/subscription-status', async (req,res)=>{
  const client_id = req.query.client_id;
  if (!client_id) return res.status(400).json({error:'client_id required'});
  try{
    const sub = await DB.getSubscription(client_id);
    return res.json({client_id, is_premium: Boolean(sub && sub.is_premium)});
  }catch(e){ return res.status(500).json({error:'failed to read subscription', details: e.message}); }
});

// AI proxy endpoint for resume suggestions
app.post('/api/ai/resume', async (req,res)=>{
  const {name, template} = req.body || {};
  // If OPENAI_API_KEY is configured, forward request to OpenAI (example). Otherwise simulate.
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return res.json({result: `Simulated AI: Resume for ${name || 'Unnamed'} (template=${template||'basic'})`});
  }
  try{
    // Example: call OpenAI completion (this is a placeholder; implement client per your provider)
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{'Authorization':'Bearer '+key,'Content-Type':'application/json'},
      body: JSON.stringify({model:'gpt-4o-mini', messages:[{role:'user', content:`Create a resume summary for ${name}`}], max_tokens:400})
    });
    const json = await resp.json();
    return res.json({result: json});
  }catch(e){ return res.status(500).json({error:'AI request failed', details:e.message}); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log('Server running on port',PORT));
