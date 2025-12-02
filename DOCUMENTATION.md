# KRREVIVEÉLITE Universe — Complete Documentation

A comprehensive, futuristic platform combining a luxurious website, 3D browser game, resume generator, and intelligent productivity tools.

## 🌌 Project Structure

```
krreviveelite-universe/
├── index.html                 # Main landing page
├── creation-hub.html         # Creative tools and resource hub
├── resume-generator.html     # Professional resume builder
├── engineering-hub.html      # Technical documentation
├── playground.html           # Interactive experiments
├── tutorials.html            # Learning resources
├── resume.html               # Standalone resume template
├── style.css                 # Global styles (1788 lines)
├── script.js                 # Prototype interactions
├── resume.css                # Resume styling
├── resume.js                 # Resume functionality & PDF export
│
├── game/                     # 3D Game Engine
│   ├── main.js              # Core Three.js game loop (~920 lines)
│   ├── particles.js         # Particle effects system
│   ├── hud.js               # Heads-up display
│   ├── minimap.js           # Real-time minimap
│   ├── store.js             # In-game store & persistence
│   ├── ai.js                # NPC behavior
│   └── utils.js             # Shared utilities
│
├── scripts/                  # Reusable JavaScript modules
│   ├── universe-tools.js    # Core utilities (30+ functions)
│   ├── ai-automation.js     # AI & behavior systems
│   ├── productivity-framework.js  # Goal & habit tracking
│   └── README.md            # Scripts documentation
│
├── css/                      # Modular stylesheets (empty, can expand)
├── templates/               # Downloadable templates (empty)
├── tutorials/               # Tutorial PDFs (empty)
├── images/                  # Graphics and assets (empty)
├── data/                    # Static JSON data
│   ├── characters.json
│   ├── gaming.json
│   ├── protocols.json
│   ├── social.json
│   └── universe.json
│
├── download/                # Distribution & packaging
│   ├── build-zip.ps1        # PowerShell script for packaging
│   └── README.md            # Download instructions
│
└── README.md               # This file
```

## 🎮 Core Features

### 1. Landing Page (`index.html`)
- **Hero Section** — Stunning intro with animated background
- **Mission Statement** — KRREVIVEÉLITE values (Mental Mastery, Strategic Thinking, etc.)
- **Gaming Section** — Featured game with pagination
- **Social Feed** — Community stories and updates
- **Promotional Section** — Call-to-action buttons
- **Responsive Design** — Mobile-first approach

### 2. 3D Browser Game (`game/`)
Built with **Three.js r0.155** and WebGL.

**Gameplay Features:**
- **Player Abilities:**
  - Dash (with particle trail)
  - Shield (protective aura with visual feedback)
  - Stun (area effect with burst particles)
  - Shoot (muzzle flash + WebAudio SFX)
- **Enemies:** Intelligent AI with stunned state handling
- **Collectibles:** Orbs for scoring
- **HUD:** Real-time stats (score, health, points, cooldowns)
- **Minimap:** Live tracking with smooth position interpolation
- **Store:** 6 in-game items with localStorage persistence
- **Post-Processing:** Selective bloom effect (EffectComposer, UnrealBloomPass)
- **Audio:** WebAudio SFX (tone-based synthesis)

**Technical Stack:**
- Three.js with PointerLockControls
- EffectComposer + RenderPass + UnrealBloomPass
- Particle pooling system
- WebAudio API for real-time sound

### 3. Resume Generator (`resume-generator.html`)
- Customizable form fields
- Live preview iframe
- PDF export via html2pdf.js
- KRREVIVEÉLITE luxury branding

### 4. Professional Hub Pages

**Creation Hub** — Tools and resources for creative work
- Resume Generator link
- Universe Dashboard (coming soon)
- AI Automation Toolkit
- Content Hub

**Engineering Hub** — Technical documentation
- Three.js Game Engine overview
- Particle System architecture
- AI & NPC System docs
- HUD & Minimap systems
- Persistence & Store layer
- WebAudio SFX integration
- Performance guidelines

**Playground** — Interactive experiments
- Pomodoro Timer
- Theme toggle
- Particle system demo
- Canvas animations
- Code snippets
- Quick stats display

**Tutorials** — Learning resources
- Game Development Guide
- AI & Automation Toolkit tutorial
- Productivity Framework
- Custom Shader Development
- WebAudio & Sound Design
- Data Persistence & Security
- Video tutorials link

## 📦 JavaScript Modules (`scripts/`)

### `universe-tools.js` (Core Utilities)
30+ utility functions including:
- **Animation:** `animateValue`, `easeInOutCubic`, `lerp`, `clamp`
- **Random:** `randRange`
- **Formatting:** `formatNumber` (K, M, B suffixes)
- **Utilities:** `debounce`, `throttle`, `deepClone`
- **Storage:** `Storage` object with get/set/remove/clear
- **Events:** `EventEmitter` class
- **DOM:** `observeElements` for IntersectionObserver
- **Graphics:** `createAnimationLoop`, device capability detection

### `ai-automation.js` (Intelligent Systems)
**Behavior Trees:**
- `BehaviorTree` — Hierarchical decision-making
- `Selector` — OR logic nodes
- `Sequence` — AND logic nodes

**State Machines:**
- `StateMachine` — Event-driven state transitions
- `SimpleStateMachine` — Simplified version

**GOAP (Goal-Oriented Action Planning):**
- `Goal` — Objectives with preconditions
- `Action` — Executable actions
- `GOAPPlanner` — A* pathfinding for planning

**Other Systems:**
- `DecisionTree` — Simple branching logic
- `InfluenceMap` — Spatial awareness
- `weightedRandom` — Probabilistic selection

### `productivity-framework.js` (Productivity Systems)
**Goal Tracking:**
- `ProductivityGoal` — Track progress with milestones
- `ProductivityTracker` — Centralized management with XP/leveling

**Habit Management:**
- `DailyRitual` — Daily habits with streak tracking
- `HabitTracker` — Long-term habit logging

**Time Management:**
- `PomodoroTimer` — Focused work sessions (25+5 default)

## 🎨 Design System

### Color Palette
- **Gold:** `#f0b700` (`--lux-gold`) — Primary accent
- **Purple:** `#8e44ad` (`--lux-purple`) — Secondary accent
- **Cyan:** `#00d9ff` — Highlight color
- **Silver:** `#c0c0c0` (`--lux-silver`) — Neutral
- **Dark:** `#0a0a0a` — Background
- **Text:** `#9aa3b2` — Body text

### Typography
- **Headings:** Playfair Display (serif, luxury)
- **Body:** Lato (sans-serif, readable)

### Z-Index Layering
- Canvas background: -1
- Navbar: 1200 (always on top)
- Game overlay: 1700
- HUD/Minimap/Store: 1701

### Responsive Breakpoints
- **Desktop:** 1024px+
- **Tablet:** 768px - 1023px
- **Mobile:** 480px - 767px
- **Small Mobile:** < 480px

## 🚀 Getting Started

### Prerequisites
- Modern browser with WebGL support
- JavaScript enabled
- HTML5 compatible

### Local Development

1. **Clone or download the repository:**
   ```bash
   cd krreviveelite-universe
   ```

2. **Serve locally** (e.g., using Python):
   ```bash
   python -m http.server 8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

### Playing the Game

1. Navigate to `index.html`
2. Click "Play & Own the Game Now" or scroll to Gaming section
3. Click the "Play Game" button
4. Controls:
   - **WASD** — Move
   - **Mouse** — Look around (click to lock pointer)
   - **Space** — Jump
   - **Q** — Dash
   - **E** — Shield
   - **R** — Stun
   - **Click/Tap** — Shoot
   - **ESC** — Exit game

### Building Productivity Goals

```javascript
import { ProductivityTracker, ProductivityGoal } from './scripts/productivity-framework.js';

const tracker = new ProductivityTracker();

// Create a goal
const goal = new ProductivityGoal('read-book', 'Read 1 Book', 300);
tracker.addGoal(goal);

// Update progress
tracker.updateGoal('read-book', 50);

// Check stats
console.log(tracker.getStats());
```

## 🏗️ Architecture Highlights

### Modular Game Design
- **main.js:** Core game loop, input handling, gameplay
- **particles.js:** Pooled particle system for effects
- **hud.js:** Real-time UI metrics
- **minimap.js:** Spatial visualization
- **store.js:** Item management & persistence
- **ai.js:** Enemy behavior and state
- **utils.js:** Shared math and utility functions

### Storage & Persistence
- **localStorage** for store purchases (key: `krrevive_purchases_v1`)
- **localStorage** for productivity data (key: `krrevive_productivity`)
- JSON serialization for complex objects
- Automatic save/load on state changes

### Performance Optimizations
- **Particle Pooling** — Pre-allocate ~1000 particles
- **Selective Bloom** — Only render glowing layer
- **Camera Shake** — Efficient Vector3 calculations
- **Lerp Interpolation** — Smooth animations
- **RequestAnimationFrame** — 60 FPS target

## 📚 API Reference

### Game API (main.js)
```javascript
startGame()           // Initialize and run game
endGame()             // Stop game and cleanup
```

### Productivity API
```javascript
tracker.addGoal(goal)           // Add productivity goal
tracker.completeRitual(id)      // Mark ritual complete
tracker.getStats()              // Get progress stats
tracker.addExperience(amount)   // Award XP (auto-levelup)
```

### Storage API
```javascript
Storage.set(key, value)         // Save data
Storage.get(key, default)       // Retrieve data
Storage.remove(key)             // Delete data
Storage.clear()                 // Clear all
```

## 🔧 Configuration

### Game Settings (game/main.js)
```javascript
const PLAYER_SPEED = 0.15
const PLAYER_DASH_FORCE = 0.3
const SHIELD_DURATION = 8000 // 8 seconds
const ENEMY_COUNT = 8
const ORB_COUNT = 20
```

### Bloom Post-Processing (game/main.js)
```javascript
const BLOOM_PARAMS = { strength: 1.5, radius: 0.4, threshold: 0.85 }
```

### Pomodoro Defaults (scripts/productivity-framework.js)
```javascript
workDuration = 25 * 60    // 25 minutes
breakDuration = 5 * 60    // 5 minutes
```

## 🐛 Troubleshooting

### Game Won't Start
- Check browser console (F12) for errors
- Ensure WebGL is supported: `gl.checkExtension('OES_standard_derivatives')`
- Try a different browser (Chrome, Firefox, Safari)

### Performance Issues
- Reduce particle count (adjust `ParticlePool` size)
- Disable bloom: comment out `bloomComposer.render()`
- Check memory usage in DevTools

### Storage Not Working
- Ensure localStorage is enabled
- Check browser's storage quota
- Try incognito mode (if testing in private window)

## 📝 File Sizes (Approximate)

- `index.html` — 532 lines
- `style.css` — 1788 lines
- `game/main.js` — 920 lines
- `scripts/universe-tools.js` — 350+ lines
- `scripts/ai-automation.js` — 450+ lines
- `scripts/productivity-framework.js` — 500+ lines

## 🎓 Learning Resources

1. **Three.js Documentation:** https://threejs.org/docs/
2. **Web Audio API:** https://developer.mozilla.org/en-US/docs/Web_Audio_API
3. **WebGL & Shaders:** https://learnopengl.com/
4. **State Machines:** Pattern design for game AI
5. **GOAP:** http://www.gameaipro.com/

## 📞 Support

- Check `tutorials.html` for guides
- Review `engineering-hub.html` for technical details
- Inspect code comments in game modules
- Visit YouTube channel: http://www.youtube.com/@Self-mastering-01

## 📄 License

KRREVIVEÉLITE Universe — All rights reserved.

---

**Last Updated:** 2024
**Version:** 1.0.0

Build your elite universe. 🌟
