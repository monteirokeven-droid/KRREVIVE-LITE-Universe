# KRREVIVEÉLITE Universe - Quick Start & Running Guide

## ⚡ 30-Second Start

```powershell
# 1. Install dependencies
npm install

# 2. Start server
npm start

# 3. Open browser
Start-Process http://localhost:3000
```

Done! You're now running the full KRREVIVEÉLITE Universe.

---

## 🎮 What to Try First

### 1. **Visit the Dashboard**
- URL: `http://localhost:3000`
- See: Hero section, pricing, quick action buttons
- Try: Click "Subscribe" or "Play Game"

### 2. **Test Magic-Link Login**
- URL: `http://localhost:3000/login.html`
- Enter: Any email (e.g., `test@example.com`)
- Check: Browser console for magic link token
- Action: Copy token, paste into verification field
- Result: Redirected to `account.html` with session active

### 3. **Play the Mini-Game**
- URL: `http://localhost:3000/mini-game.html`
- Controls:
  - **Move:** Arrow keys or WASD
  - **Shoot:** Spacebar or click
  - **Start:** Click "Start" button
- Features:
  - Score increases per enemy destroyed
  - Leaderboard shows top 10 players
  - Submit your score after game over
  - Unlock premium for triple-shot and faster gameplay

### 4. **Test Premium Subscription**
- Click "Unlock Premium" button on any page
- Modal appears with pricing
- Click "Checkout" → Stripe session link (test mode)
- Use test card: `4242 4242 4242 4242` (any future expiry, any CVC)
- After payment: Premium features activate
- Try game again: Triple-shot enabled, faster spawn rate

### 5. **Admin Console (Optional)**
- URL: `http://localhost:3000/admin.html?token=my_admin_secret`
- See: Subscriptions list, leaderboard
- Requires: ADMIN_TOKEN env var match

---

## 🛠️ Environment Variables (Optional)

Create a `.env` file or set in PowerShell:

```powershell
# Server
$env:PORT = 3000
$env:ADMIN_TOKEN = 'my_admin_secret'

# Database (default: data/krrevive.db)
$env:DATABASE_URL = 'sqlite:./data/krrevive.db'

# Stripe (for real payments)
$env:STRIPE_SECRET = 'sk_test_...'
$env:STRIPE_PRICE_ID = 'price_...'
$env:STRIPE_WEBHOOK_SECRET = 'whsec_...'

# Email (for real magic links)
$env:SENDGRID_API_KEY = 'SG...'

# AI (for real resume/code generation)
$env:OPENAI_API_KEY = 'sk-...'
```

**Without these:** All features work with simulated data (perfect for MVP testing).

---

## 📊 Testing Scenarios

### Scenario 1: New User Sign-Up → Game Play
```
1. Visit login.html
2. Enter email → get magic link
3. Verify → redirected to account.html
4. Click "Dashboard" → go to index.html
5. Click "Play Game" → mini-game.html
6. Play game, submit score
✓ Complete user flow
```

### Scenario 2: Subscription Purchase → Premium Game
```
1. On any page, click "Subscribe" button
2. Modal appears → click "Checkout"
3. Stripe test card → 4242 4242 4242 4242 → submit
4. Return to game page
5. Game now shows "Premium active" notice
6. Triple-shot enabled, enemies spawn slower
✓ Monetization flow complete
```

### Scenario 3: Leaderboard Persistence
```
1. Play game 1 → Score: 500 → Submit as "Player1"
2. Play game 2 → Score: 300 → Submit as "Player2"
3. Open mini-game again → Leaderboard shows both scores
4. Refresh page → Scores still visible (persistent)
✓ Database + localStorage backup working
```

### Scenario 4: Offline Mode
```
1. Start game (online)
2. Submit score (saved to DB + localStorage)
3. Turn off internet / close server
4. Refresh page → Leaderboard still shows (from localStorage)
5. Play game again → Score saved locally (no server needed)
✓ Offline fallback working
```

---

## 🗂️ File Locations for Quick Reference

| Feature | File(s) |
|---------|---------|
| **Game Logic** | `scripts/game.js` |
| **Subscription/Session** | `scripts/subscription.js` |
| **API Endpoints** | `server.js` |
| **Database** | `db.js`, `data/krrevive.db` |
| **Styling** | `css/style.css` |
| **Pages** | `*.html` files in root |
| **Configuration** | `.env` file (optional) |

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| **Port 3000 in use** | `npm start -- --port 3001` or kill process on port 3000 |
| **Database locked** | Restart server, or delete `data/krrevive.db` |
| **Game not loading** | Check console for errors, verify `#gameCanvas` element exists |
| **Leaderboard empty** | Submit a score first, refresh page |
| **Premium features not working** | Call `Game.setPremium(true)` manually in console |
| **Sprites not showing** | Run `node scripts/create-sprites.js` (requires canvas npm pkg) |
| **Magic link not working** | Check browser console for token, paste manually |

---

## 📱 Responsive Testing

### Desktop (1920x1080)
- Full layout with sidebar and canvas
- All buttons and controls visible

### Tablet (768x1024)
- Responsive nav, stacked layout
- Game canvas resizes

### Mobile (375x667)
- Single-column layout
- Touch controls for game (tap to shoot, swipe to move)

Test by:
```powershell
# Chrome DevTools: F12 → Toggle device toolbar (Ctrl+Shift+M)
# Or resize browser window
```

---

## 📊 Database Inspection

### View Leaderboard
```powershell
# SQLite CLI (if installed)
sqlite3 data/krrevive.db "SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10;"
```

### View Users
```powershell
sqlite3 data/krrevive.db "SELECT * FROM users;"
```

### View Sessions
```powershell
sqlite3 data/krrevive.db "SELECT * FROM sessions WHERE expires_at > datetime('now');"
```

### Reset Database
```powershell
Remove-Item data/krrevive.db
# Database will auto-recreate on next server start
```

---

## 🚀 Deployment Checklist

- [ ] Set production `STRIPE_SECRET`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`
- [ ] Set production `SENDGRID_API_KEY` for real emails
- [ ] Set production `OPENAI_API_KEY` for AI features
- [ ] Enable HTTPS (CloudFlare, Let's Encrypt)
- [ ] Configure domain name and DNS
- [ ] Migrate database to PostgreSQL (recommended for scale)
- [ ] Add rate limiting (`express-rate-limit`)
- [ ] Enable security headers (CSP, HSTS)
- [ ] Set up monitoring (Sentry, DataDog)
- [ ] Run performance tests (Lighthouse, WebPageTest)
- [ ] Backup strategy for `data/` and database

---

## 🎯 Key Commands

```powershell
# Development
npm start                    # Start server on :3000
npm run dev                  # (if script exists) Watch mode

# Testing
npm test                     # Run tests (if configured)

# Database
npm run db:reset             # Reset database (if script exists)
sqlite3 data/krrevive.db     # Direct SQLite access

# Build
npm run build                # Bundle for production (if configured)

# Sprites
node scripts/create-sprites.js  # Generate PNG sprites
```

---

## 📞 Quick Debugging

### In Browser Console

```javascript
// Check subscription status
Subscription.isPremium()

// Check current session
Session.getToken()
Session.getMe()

// Check game state
Game.score
Game.level
Game.running
Game.premiumMode

// Manually trigger game over
Game.endGame()

// Manually add particles
Game.spawnParticles(400, 250, 20)
```

### In Server

```powershell
# Check if server is running
curl http://localhost:3000

# Test API endpoint
curl -X GET http://localhost:3000/api/leaderboard

# Inspect network traffic
# Chrome DevTools → Network tab → Monitor requests
```

---

## 🎓 Learning Resources

Inside the project:
- `PROJECT_STATUS.md` — Full system documentation
- `README.md` — General overview
- `scripts/game.js` — Inline comments explaining game logic
- `scripts/subscription.js` — Subscription flow comments
- `server.js` — API endpoint comments

External:
- [Express.js Docs](https://expressjs.com)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Stripe Test Mode](https://stripe.com/docs/testing)
- [SQLite Tutorial](https://www.sqlite.org/docs.html)

---

## ✨ You're All Set!

The KRREVIVEÉLITE Universe is **ready to run**, **fully functional**, and **production-capable**. 

Start with `npm start` and enjoy exploring!

**Questions?** Check `PROJECT_STATUS.md` for detailed docs or inspect the source code — it's well-commented.

Good luck! 🚀
