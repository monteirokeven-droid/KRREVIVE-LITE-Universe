% KRREVIVEÉLITE Universe — Quick Start Guide

# Getting Started with KRREVIVEÉLITE

Welcome to the KRREVIVEÉLITE Universe! This guide will help you get up and running in minutes.

## 🚀 Installation

### Option 1: Local Development (Recommended)

1. **Clone or download the repository:**
   ```bash
   git clone <repository-url>
   cd krreviveelite-universe
   ```

2. **Serve locally using Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

3. **Or use Node.js (http-server):**
   ```bash
   npx http-server .
   ```

4. **Open in your browser:**
   ```
   http://localhost:8000
   ```

### Option 2: Deploy to Hosting

1. Upload all files to your hosting provider (Netlify, Vercel, GitHub Pages, etc.)
2. No build step required—it's static HTML + CSS + JS
3. Visit your domain

## 🎮 Playing the Game

### Launch the Game
1. Go to `http://localhost:8000` (or your deployed URL)
2. Look for the "Play Game" button
3. Click and the game overlay will appear

### Game Controls

| Key | Action |
|-----|--------|
| **W/A/S/D** | Move forward/left/back/right |
| **Mouse** | Look around |
| **Click** | Lock mouse pointer |
| **Space** | Jump |
| **Q** | Dash (create particle trail) |
| **E** | Shield (protective aura) |
| **R** | Stun (area effect) |
| **LMB/Tap** | Shoot (muzzle flash + SFX) |
| **ESC** | Exit game |

### Game Objectives
- **Collect Orbs** — Gain points
- **Defeat Enemies** — Use abilities strategically
- **Unlock Store Items** — Buy upgrades with points
- **Beat Your Score** — Compete with your high scores

### Store Items
Buy items in-game using points (localStorage persists purchases):
1. Speed Boost
2. Health Regen
3. Damage Multiplier
4. Particle Effects
5. Audio Enhancement
6. Difficulty Modifier

## 🛠️ For Developers

### Project Structure Overview

```
├── index.html              # Main landing page
├── game/                   # 3D game engine (Three.js)
│   ├── main.js            # Core game loop
│   ├── particles.js       # Particle effects
│   ├── hud.js             # UI overlay
│   ├── minimap.js         # Real-time map
│   ├── store.js           # In-game store
│   ├── ai.js              # Enemy AI
│   └── utils.js           # Utilities
├── scripts/               # Reusable modules
│   ├── universe-tools.js  # Core utilities
│   ├── ai-automation.js   # AI systems
│   └── productivity-framework.js  # Productivity
└── style.css              # Global styling
```

### Quick Code Examples

#### 1. Use Universe Tools

```javascript
import { lerp, Storage, clamp } from './scripts/universe-tools.js';

// Smooth animation
const value = lerp(0, 100, 0.5); // Midway between 0 and 100

// Save data
Storage.set('my-data', { name: 'Elite' });
const data = Storage.get('my-data');

// Clamp values
const clamped = clamp(150, 0, 100); // 100
```

#### 2. Create a Behavior Tree

```javascript
import { Sequence, Selector } from './scripts/ai-automation.js';

const root = new Sequence();
root.addChild(checkEnemyHealth);
root.addChild(dodgeAttack);
root.addChild(counterAttack);

const tree = new BehaviorTree(root);
tree.execute(context);
```

#### 3. Track Productivity

```javascript
import { ProductivityTracker, DailyRitual } from './scripts/productivity-framework.js';

const tracker = new ProductivityTracker();

// Add a daily ritual
const ritual = new DailyRitual('morning', 'Morning Meditation');
tracker.addRitual(ritual);

// Complete it
tracker.completeRitual('morning');

// Get stats
console.log(tracker.getStats());
```

## 📖 Available Pages

| Page | URL | Purpose |
|------|-----|---------|
| **Home** | `index.html` | Landing page + game |
| **Creation Hub** | `creation-hub.html` | Tools & resources |
| **Resume Generator** | `resume-generator.html` | Build professional resume |
| **Engineering Hub** | `engineering-hub.html` | Technical docs |
| **Playground** | `playground.html` | Interactive experiments |
| **Tutorials** | `tutorials.html` | Learning guides |

## 🎓 Learning Path

### For Game Enthusiasts
1. ✅ Play the game on `index.html`
2. 📖 Check `engineering-hub.html` for tech details
3. 🛠️ Experiment in `playground.html`
4. 📚 Read `tutorials.html` for advanced topics

### For Developers
1. 📖 Read `DOCUMENTATION.md`
2. 🔍 Review `scripts/README.md`
3. 💻 Check `engineering-hub.html` for architecture
4. 🧪 Use code snippets in `playground.html`
5. 📝 Build your own features!

### For Productivity Users
1. 📊 Explore `playground.html` Pomodoro timer
2. 📚 Read `scripts/productivity-framework.js`
3. 🛠️ Integrate into your workflow
4. 📈 Track goals and rituals

## 🔧 Configuration

### Game Settings

Edit `game/main.js`:
```javascript
const PLAYER_SPEED = 0.15          // Movement speed
const PLAYER_DASH_FORCE = 0.3      // Dash force
const SHIELD_DURATION = 8000       // Shield duration (ms)
const ENEMY_COUNT = 8              // Number of enemies
const ORB_COUNT = 20               // Number of collectibles
```

### Pomodoro Defaults

Edit `scripts/productivity-framework.js`:
```javascript
workDuration = 25 * 60   // 25 minutes
breakDuration = 5 * 60   // 5 minutes
```

### Theme Colors

Edit `style.css`:
```css
:root {
  --lux-gold: #f0b700;    /* Primary accent */
  --lux-purple: #8e44ad;  /* Secondary accent */
  --lux-silver: #c0c0c0;  /* Neutral */
  --lux-cyan: #00d9ff;    /* Highlight */
}
```

## 🐛 Troubleshooting

### Game Won't Start
- Check browser console (F12 → Console)
- Ensure WebGL is supported
- Try Chrome, Firefox, or Safari
- Clear browser cache

### Performance Issues
- Reduce ENEMY_COUNT in game/main.js
- Disable bloom: comment out bloomComposer.render()
- Check DevTools Performance tab

### Storage Not Working
- Ensure localStorage is enabled in browser
- Try incognito/private mode
- Check storage quota (usually 5-10MB)

### Audio Issues
- Some browsers require user interaction before audio
- Click on game canvas first
- Check browser audio permissions

## 📚 Further Resources

### Official Documentation
- `DOCUMENTATION.md` — Comprehensive guide
- `SITEMAP.md` — Site navigation guide
- `scripts/README.md` — Module documentation

### External Resources
- Three.js Docs: https://threejs.org/docs/
- MDN Web Docs: https://developer.mozilla.org/
- Web Audio API: https://developer.mozilla.org/docs/Web/API/Web_Audio_API

### Community
- YouTube: http://www.youtube.com/@Self-mastering-01
- Source Code: Review comments in game modules
- Documentation: Check DOCUMENTATION.md

## 💡 Tips & Tricks

### Game Tips
- **Use abilities strategically** — Don't waste shield/stun
- **Kite enemies** — Keep moving to avoid damage
- **Collect orbs first** — Prioritize scoring
- **Buy store items** — Upgrades help you progress

### Development Tips
- **Use modules separately** — Import only what you need
- **Listen for events** — Track state changes with event emitters
- **Cache storage reads** — Don't read localStorage repeatedly
- **Profile your code** — Use DevTools to find bottlenecks

### Productivity Tips
- **Set realistic goals** — Break large tasks into smaller chunks
- **Daily rituals work** — Consistency builds streaks
- **Use Pomodoro** — 25 min focused work is powerful
- **Track everything** — You can't improve what you don't measure

## 🎉 What's Next?

1. **Customize the site** — Edit colors, fonts, content
2. **Add new pages** — Extend the hub with custom features
3. **Build AI systems** — Create intelligent NPCs
4. **Track productivity** — Use frameworks for goal tracking
5. **Deploy** — Share your universe with the world

## 📞 Support

- Check documentation files
- Review code comments
- Watch tutorial videos (coming soon)
- Experiment in playground.html

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**License:** KRREVIVEÉLITE — All rights reserved

**Ready to awaken your elite potential? Start playing now! 🌟**
