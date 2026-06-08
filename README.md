# Kev-VibeCut

<div align="center">

> **Vibe it. Cut it.** — Agent-driven open-source video editor. Forked from [Clypra](https://github.com/AIEraDev/Clypra).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![BP](https://img.shields.io/badge/BP-Read%20Plan-blue)](https://kevph2026.github.io/Kev-VibeCut/)
[![BRD](https://img.shields.io/badge/BRD-Read%20Spec-purple)](https://kevph2026.github.io/Kev-VibeCut/)

📋 [Business Plan](https://kevph2026.github.io/Kev-VibeCut/) • 📐 [BRD](https://kevph2026.github.io/Kev-VibeCut/) • 🔧 [Upstream](https://github.com/AIEraDev/Clypra)

</div>

---

## What is Kev-VibeCut?

Kev-VibeCut is an **Agent-driven video editor**. You describe what you want in natural language, and AI does the editing.

Most video editors make YOU learn the tool. Kev-VibeCut flips that: **the tool learns what you want.**

```
You: "Cut the first 10 seconds, add a fade transition, export as 16:9"
Kev-VibeCut: ✅ Done.
```

Built on top of [Clypra](https://github.com/AIEraDev/Clypra)'s S-tier WebGL rendering engine (MIT licensed), Kev-VibeCut adds an **Agent layer** that turns natural language into timeline operations.

---

## Why Kev-VibeCut?

| | CapCut/剪映 | Descript | Kev-VibeCut |
|---|---|---|---|
| **Interaction** | Manual drag & drop | Text-based editing | **Natural language (Agent)** |
| **Platform** | Desktop + Mobile | Desktop | **Web + Desktop + Mobile** |
| **Open Source** | ❌ | ❌ | **✅ MIT** |
| **Language** | Chinese + English | English only | **Chinese first, English WIP** |
| **Learning curve** | Medium | Low | **Zero** |

Kev-VibeCut picks up where "vibe coding" left off — **vibe cutting**. You describe the feeling, AI handles the timeline.

---

## 🗺️ Project Documentation

This repo is more than code. Every Kev-VibeCut project ships with full business context:

| Document | Description |
|---|---|
| **[📋 Business Plan](https://kevph2026.github.io/Kev-VibeCut/)** | Strategy, market analysis, business model, growth plan |
| **[📐 BRD](BRD.md)** | User personas, user stories, Agent architecture, MVP scope |
| **[🔬 Research](RESEARCH.md)** | Deep-dive on Clypra codebase (52K LOC TS, WebGL engine, Rust backend) |

> *"Open source isn't just about code. It's about sharing the thinking behind the code."*

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────┐
│              Agent Layer (NEW)                │
│  NL Input → Intent → TimelineAction[] → Exec  │
├──────────────────────────────────────────────┤
│         Clypra Core (inherited, stable)       │
│  WebGL Renderer · Timeline · FFmpeg · Zustand │
├──────────────────────────────────────────────┤
│       Platform Adapters (Web ← NEW)           │
│   Web (React) · Desktop (Tauri) · Mobile (Capacitor) │
└──────────────────────────────────────────────┘
```

**Key insight:** Clypra's WebGL renderer is pure TypeScript. It runs in a browser natively — no Rust, no Tauri required. We're adding the Web adapter + Agent layer on top.

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/KevPH2026/Kev-VibeCut.git
cd Kev-VibeCut

# Install
npm install

# Dev (Web mode — WIP)
npm run dev

# Dev (Desktop mode — via Tauri)
npm run tauri dev
```

> ⚠️ Kev-VibeCut is in early development. Web version + Agent layer are being built. Desktop version inherits Clypra's full feature set.

---

## 🛤️ Roadmap (12-week MVP)

| Phase | Week | Goal |
|---|---|---|
| 1. Foundation | 1-3 | WebPlatformAdapter, browser-based preview |
| 2. Agent | 4-6 | NL → TimelineAction mapping, core commands |
| 3. Polish | 7-9 | Agent UX, FFmpeg.wasm export, templates |
| 4. Launch | 10-12 | Open source release, hosted beta, customer pilot |

See [Business Plan](https://kevph2026.github.io/Kev-VibeCut/) for full details.

---

## 🤝 Contributing

We welcome contributions in three areas:

1. **Code** — Web adapter, Agent layer, platform support
2. **Agent commands** — Help us map natural language to timeline operations
3. **Strategy** — Review the BP/BRD and open issues with your thoughts

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## ⚖️ License

MIT — same as upstream Clypra. Open source, open business.

---

## 🙏 Credits

- [Clypra](https://github.com/AIEraDev/Clypra) by [@theunavailableguy](https://github.com/theunavailableguy) — the incredible open-source video editor this project is built upon
- All Clypra contributors for the S-tier WebGL rendering engine and modular architecture

---

*Kev-VibeCut — Vibe it. Cut it.*
