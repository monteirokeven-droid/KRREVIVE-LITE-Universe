const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = path.join(__dirname, 'data', 'krrevive.db');
if (!fs.existsSync(path.dirname(DB_FILE))) fs.mkdirSync(path.dirname(DB_FILE), {recursive:true});

const db = new sqlite3.Database(DB_FILE);

db.serialize(()=>{
  db.run(`CREATE TABLE IF NOT EXISTS subscriptions (
    client_id TEXT PRIMARY KEY,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    is_premium INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    score INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    client_id TEXT,
    magic_token TEXT,
    magic_token_expires DATETIME,
    is_verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS webhook_events (
    id TEXT PRIMARY KEY,
    event_type TEXT,
    client_reference_id TEXT,
    processed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

function getLeaderboard(limit=20){
  return new Promise((resolve, reject)=>{
    db.all(`SELECT name,score FROM leaderboard ORDER BY score DESC, created_at DESC LIMIT ?`, [limit], (err, rows)=>{
      if (err) return reject(err); resolve(rows);
    });
  });
}

function addScore(name, score){
  return new Promise((resolve, reject)=>{
    db.run(`INSERT INTO leaderboard (name,score) VALUES (?,?)`, [name, score], function(err){
      if (err) return reject(err); resolve({id: this.lastID});
    });
  });
}

function upsertSubscription(client_id, data={}){
  return new Promise((resolve, reject)=>{
    db.run(`INSERT INTO subscriptions (client_id, stripe_customer_id, stripe_subscription_id, is_premium)
      VALUES (?,?,?,?)
      ON CONFLICT(client_id) DO UPDATE SET
        stripe_customer_id=excluded.stripe_customer_id,
        stripe_subscription_id=excluded.stripe_subscription_id,
        is_premium=excluded.is_premium`,
      [client_id, data.stripe_customer_id||null, data.stripe_subscription_id||null, data.is_premium?1:0], function(err){
        if (err) return reject(err); resolve({changes: this.changes});
    });
  });
}

function getSubscription(client_id){
  return new Promise((resolve, reject)=>{
    db.get(`SELECT client_id, stripe_customer_id, stripe_subscription_id, is_premium FROM subscriptions WHERE client_id = ?`, [client_id], (err,row)=>{
      if (err) return reject(err); resolve(row || null);
    });
  });
}

function createMagicLink(email, client_id){
  const token = require('crypto').randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 24*3600*1000).toISOString();
  return new Promise((resolve, reject)=>{
    db.run(`INSERT INTO users (email, client_id, magic_token, magic_token_expires) VALUES (?,?,?,?)
      ON CONFLICT(email) DO UPDATE SET magic_token=excluded.magic_token, magic_token_expires=excluded.magic_token_expires`,
      [email, client_id, token, expires], function(err){
        if (err) return reject(err); resolve({token, email, expires});
    });
  });
}

function verifyMagicLink(email, token){
  return new Promise((resolve, reject)=>{
    db.get(`SELECT * FROM users WHERE email=? AND magic_token=? AND magic_token_expires > CURRENT_TIMESTAMP`, [email, token], (err,row)=>{
      if (err) return reject(err);
      if (!row) return resolve(null);
      // Mark verified and clear token
      db.run(`UPDATE users SET is_verified=1, magic_token=NULL WHERE id=?`, [row.id], (err2)=>{
        if (err2) return reject(err2);
        resolve({id: row.id, email: row.email, client_id: row.client_id});
      });
    });
  });
}

function getUser(email){
  return new Promise((resolve, reject)=>{
    db.get(`SELECT id, email, client_id, is_verified FROM users WHERE email=?`, [email], (err,row)=>{
      if (err) return reject(err); resolve(row || null);
    });
  });
}

function recordWebhookEvent(event_id, event_type, client_reference_id){
  return new Promise((resolve, reject)=>{
    db.run(`INSERT INTO webhook_events (id, event_type, client_reference_id) VALUES (?,?,?)`, [event_id, event_type, client_reference_id], (err)=>{
      if (err && err.message.includes('UNIQUE')) return resolve({already_recorded: true});
      if (err) return reject(err);
      resolve({recorded: true});
    });
  });
}

function createSession(user_id, client_id){
  const token = require('crypto').randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 30*24*3600*1000).toISOString();
  return new Promise((resolve, reject)=>{
    db.run(`UPDATE users SET magic_token=?, magic_token_expires=? WHERE id=?`, [token, expires, user_id], (err)=>{
      if (err) return reject(err);
      resolve({session_token: token, client_id, expires});
    });
  });
}

function verifySession(session_token){
  return new Promise((resolve, reject)=>{
    db.get(`SELECT id, email, client_id, is_verified FROM users WHERE magic_token=? AND magic_token_expires > CURRENT_TIMESTAMP`, [session_token], (err,row)=>{
      if (err) return reject(err); resolve(row || null);
    });
  });
}

module.exports = { getLeaderboard, addScore, upsertSubscription, getSubscription, createMagicLink, verifyMagicLink, getUser, recordWebhookEvent, createSession, verifySession };
