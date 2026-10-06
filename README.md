# ⏳ Internet Time Machine — The Interactive Digital Museum

An interactive digital museum showing how the internet, technology, websites, games, apps, and online culture changed over time (1980 – 2026).

---

## 🌟 Highlights & Features

### 🏠 1. Interactive Homepage & Hero
- **Hero Banner:** "Explore the Internet Through Time" with ambient era lighting.
- **Quick Chrono-Jump:** Jump instantly between pivotal watershed years (1984, 1991, 1995, 1998, 2001, 2004, 2007, 2010, 2016, 2020, 2022, 2024, 2026).
- **Historical Chapters:** Overview of 5 major technological eras.
- **Hall of Fame:** Featured milestones with deep-dive dossier access.
- **Museum Exhibits Quick Launch:** One-click launch into emulators and comparison sliders.

### ⏳ 2. Continuous Year-by-Year Interactive Timeline
- Scrub smoothly across **1983 to 2026** with keyboard arrow navigation (`←` and `→`).
- Dynamic annual profile for every year:
  - **Web Design Paradigm:** Era aesthetics, typography, layout rules, and authentic color palettes.
  - **Connection Speeds:** From 300 bps acoustic modems and 56k dial-up to Gigabit 5G and fiber.
  - **Online Population:** Global connected user metrics across 40 years.
  - **Dimensions:** Popular websites, hit games, major hardware releases, social platforms, and viral cultural trends.
  - **Era-Adaptive Aesthetics:** CRT green phosphor (1980s), Warm amber / Windows 95 (1990s), Frutiger Aero gloss (2000s), Flat minimalism (2010s), and Dark obsidian glassmorphism with neural glow (2020s).

### 🖥️ 3. Website Evolution & Interactive Comparison Sliders
- Interactive before/after split sliders for iconic web platforms:
  - **Google Search:** 1998 Stanford Beta vs Modern AI Overviews.
  - **YouTube:** 2005 Flash Player & 5-star ratings vs Modern 4K & Shorts.
  - **Amazon:** 1995 Bookstore catalog vs Modern personalized commerce engine.
  - **Apple.com:** 1997 Beige Mac grid vs Modern cinematic spatial computing.
  - **Facebook:** 2004 [thefacebook] Harvard login vs Modern Meta feed.
  - **Yahoo!:** 1996 Hand-curated directory vs Modern news & finance hub.
  - **Wikipedia:** 2001 UseModWiki vs Modern Vector 2022 skin.
  - **Reddit:** 2006 Old Reddit text density vs Modern multimedia feed.

### 🕹️ 4. Live Historical Software Emulators
- **Google 1998 Beta:** Functional search engine simulating original PageRank results for queries (`Netscape`, `Space Jam`, `DOOM`, `Linux`, `Stanford`).
- **Yahoo! 1996 Directory:** Navigable hierarchical tree of the early World Wide Web.
- **YouTube 2005 Player:** Interactive 4:3 Flash video player simulation of "Me at the zoo" with 5-star rating system and subscribe button.
- **[thefacebook] 2004:** Harvard student directory login screen with Peter Wolf header.

### 🎮 5. Gaming History Timeline
- Evolution of consoles, PC gaming, 3D graphics hardware, game engines (id Tech, Source, Unreal), multiplayer networks (Battle.net, Xbox Live), and modern competitive esports.
- Filterable by Era (8-bit, 3D Revolution, Online Golden Age, HD, Modern) and Type.

### 💻 6. Technology & Silicon Timeline
- Detailed hardware profiles: Computers (Macintosh, iMac G3, MacBook Air, Vision Pro), Smartphones (Motorola DynaTAC, Nokia 3310, iPhone), GPUs (3dfx Voodoo, GeForce 256, 8800 GTX, RTX), CPUs (Pentium, Ryzen, Apple M1), and Networking (TCP/IP, Wi-Fi 802.11b, 4G LTE, 5G).

### 💬 7. Social Media & Culture Evolution
- Chronological development from BBS, Usenet, IRC, and instant messengers (ICQ, AIM, MSN) to MySpace, Facebook, Twitter, Instagram, TikTok, and the decentralized Fediverse/Bluesky.

### 🤖 8. Artificial Intelligence Timeline
- Historical trajectory from Alan Turing's 1950 Imitation Game and the 1956 Dartmouth Workshop to Deep Blue, AlexNet, AlphaGo, Transformers, ChatGPT, Gemini multimodal context, and reasoning agents.

### 🎲 9. "Take Me Somewhere in Time" (Random Year)
- High-speed quantum number rolling animation with custom bandpass audio whoosh and confetti celebration.

### 🔍 10. Powerful Global Search
- Filter across years, websites, devices, games, companies, trends, and historical events with Category and Era filters.
- Keyboard shortcut: press `/` or `Ctrl+K`.

### 📻 11. Sounds of the Internet (Web Audio API Synthesizer)
- 100% synthesized in the browser without external audio dependencies:
  - **56K Dial-Up Modem Handshake:** Off-hook DTMF dialing, ring tone, answer tone, and V.90 baud rate negotiation screech with live terminal status logs.
  - **Windows 95 Inspired Chime:** Soothing ambient arpeggio.
  - **ICQ "Uh-Oh!" Alert:** Vintage messenger chirp.
  - **Cosmic Time Warp Whoosh:** Portal transition sound.

### 📺 12. Retro CRT Monitor Filter
- Toggleable CRT scanlines, subtle cathode screen curvature, and phosphor glow filter.

### 🧭 13. Time Traveler Passport
- Tracks explored years and eras during your visit, awarding museum achievement stamps ("Dial-up Veteran", "Web 2.0 Pioneer", "AI Chrononaut").

---

## 🚀 Running Locally

1. Clone or navigate to the directory:
   ```bash
   cd internet-time-machine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🏛️ Architecture & Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + Glassmorphism + Responsive Layouts
- **Icons:** Lucide React
- **Audio:** Web Audio API (real-time oscillator and filter synthesis)
- **Effects:** Canvas Confetti + Custom CRT Scanline shaders
- **Data Layer:** Modular typed registries in `src/data/`
