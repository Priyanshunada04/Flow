# Flow 🌊 — Banking That Disappears

**AI-native, context-aware financial companion for Gen Z.**

Flow eliminates the friction of traditional finance apps by embedding intelligent money management directly into messaging platforms — iMessage, Instagram, Uber — where conversations already happen. Not another app. Not a bank. Infrastructure that disappears.

![Flow Platform](https://img.shields.io/badge/Platform-Embedded_Finance-C9A227?style=flat-square)
![React](https://img.shields.io/badge/React-18-64FFDA?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)

---

## What is Flow?

Flow is an embedded finance infrastructure layer designed for Tier 1-2 banks, credit unions, and financial institutions. Banks license the SDK. Gen Z gets banking that lives where they already are.

### Core Philosophy

| Principle | Description |
|-----------|-------------|
| **Invisible Until Needed** | No app switching, no forms. Banking surfaces at the moment of need, then disappears. |
| **Conversational by Design** | Money talk happens in chats. Natural language in, financial action out. |
| **Predictive, Not Reactive** | ML anticipates needs before users ask. Proactive, not post-hoc. |
| **Social by Default** | Splitting, sharing, saving together — first-class behaviors. |

---

## Platform Ecosystem

```
┌─────────────────────────────────────────────────────────┐
│                    FLOW PLATFORM                         │
│              (Shared Infrastructure)                     │
├─────────────┬─────────────┬─────────────────────────────┤
│  FLOW SPLIT │  FLOW SAFE  │      FLOW TOGETHER          │
│  Reactive   │  Proactive  │      Social                 │
│  Bill       │  Cash Flow  │      Group                  │
│  Splitting  │  Guidance   │      Savings                │
└─────────────┴─────────────┴─────────────────────────────┘
                      │
              ┌───────┴───────┐
              │  SHARED LAYER  │
              │ • User Profiles │
              │ • Bank/Card API │
              │ • ML Engine     │
              │ • Notifications │
              │ • Security      │
              └───────────────┘
```

### Flow Split — Reactive Splitting
User has already spent money → divide the cost inside iMessage. NLP parses "$94.50 split 3" into a rich payment card with one-tap settlement.

### Flow Safe — Proactive Guidance
ML continuously predicts cash flow 7/14/30 days out. Contextual nudges delivered on lock screen, inline in iMessage, or via widgets — at the exact moment of decision.

### Flow Together — Social Savings
Group savings pots inside iMessage group chats. Progress tracking, contribution scheduling, milestone celebrations, and gentle accountability mechanics.

### Cross-App Intelligence
Products aren't siloed. The shared ML engine creates intelligent handoffs:
- **Safe → Split**: "Dinner will put you over budget" → user proceeds → auto-suggest split
- **Together → Split**: Group pot reaches goal but booking costs more → auto-split overage
- **Split → Safe**: Frequent splits detected → suggest shared expense pot

---

## Interactive Prototypes

| Product | Prototype | Description |
|---------|-----------|-------------|
| **Flow Split** | [Launch →](https://www.figma.com/make/wkKulpcf5Upid6V0bKaK5L/Flow-Split-iOS-Prototype?fullscreen=1&t=SMKJe9FIKXgqBdK6-1) | Bill splitting in iMessage — NLP parsing to settlement |
| **Flow Safe** | [Launch →](https://www.figma.com/make/vSadqxByG8BfhBhh9dAe1x/Flow-Safe-Screen-Design?fullscreen=1&t=2Ffu9agxOkHFCN41-1) | ML-powered safe-to-spend predictions and contextual nudges |
| **Flow Together** | [Launch →](https://www.figma.com/make/Y65Vnl0xgmKYscizOWLdkf/Flow-Together-Screen?fullscreen=1&t=MwAbMi4zyVvupNXA-1) | Group savings pots with milestones and social accountability |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 6 |
| Styling | CSS-in-JS (inline styles + CSS variables) |
| Typography | Newsreader (serif) · Outfit (body) · Fira Code (mono) |
| Animations | CSS transitions + Intersection Observer scroll reveals |
| Deployment | Netlify |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- npm or yarn

### Installation

```bash
git clone https://github.com/Priyanshunada04/Flow.git
cd Flow
npm install
npm run dev
```

The site will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## Deployment

Deployed on **Netlify** with auto-deploy from GitHub.

**Live site:** [charming-cat-c52d63.netlify.app](https://charming-cat-c52d63.netlify.app/)

---

## Project Structure

```
flow/
├── index.html              # Entry HTML with SEO meta tags
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment config
├── netlify.toml            # Netlify deployment config
├── .gitignore
├── LICENSE
├── README.md
└── src/
    ├── main.jsx            # React entry point
    └── App.jsx             # Full application (single-file component)
```

---

## Site Sections

| # | Section | Description |
|---|---------|-------------|
| — | Hero | "Banking That Disappears" headline, key metrics, CTAs |
| 01 | The Problem | Gen Z banking abandonment data with research synthesis |
| 02 | Core Philosophy | Four design principles |
| 03 | Platform Ecosystem | Architecture diagram with shared infrastructure layer |
| 04 | Flow Split | Deep dive — user flow, iMessage mockup, 5-step process |
| 05 | Flow Safe | Deep dive — ML pipeline, 3 contextual scenarios |
| 06 | Flow Together | Deep dive — savings pot dashboard, milestone mechanics |
| 07 | Cross-App Intelligence | Three integration flows between products |
| 08 | Interactive Prototypes | Live Figma prototypes for Split, Safe, and Together |
| 09 | Business Model | SaaS + usage pricing, tier breakdown, $12M ARR path |

---

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#081224` | Page background |
| Card | `rgba(18,34,60,0.45)` | Card surfaces |
| Text | `#E8F0FE` | Headlines, primary text |
| Muted | `#8A94AE` | Body text, captions |
| Gold | `#C9A227` | CTAs, accents, highlights |
| Teal | `#64FFDA` | Data, positive metrics |
| Coral | `#FF6B6B` | Alerts, warnings |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Display / Headlines | Newsreader | 700 |
| Body / UI | Outfit | 300–600 |
| Code / Data | Fira Code | 400–500 |

---

## Business Model

| Tier | Target | Pricing |
|------|--------|---------|
| Tier 1 | Top 20 Banks | Custom Enterprise |
| Tier 2 | Regional Banks | $50K+/yr + usage |
| Credit Union | CU Networks | $25K+/yr + usage |

Target: **$12M ARR by Year 3**

---

<p align="center">
  <strong>Flow 🌊</strong><br/>
  <em>Banking infrastructure for the invisible era.</em>
</p>
