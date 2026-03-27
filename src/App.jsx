import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
// FLOW — AI-native, context-aware financial companion
// Portfolio Case Study · Rebuilt to spec
// ═══════════════════════════════════════════════════════════

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 36, style = {} }) {
  const [ref, vis] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

// ── Shared Components ─────────────────────────────────────
function Section({ id, children, bg = "transparent", style = {} }) {
  return (
    <section id={id} style={{ padding: "clamp(64px, 10vw, 110px) 0", background: bg, position: "relative", ...style }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)" }}>{children}</div>
    </section>
  );
}

function Tag({ children }) {
  return (
    <div style={{
      fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 500,
      color: "#C9A227", letterSpacing: "0.16em", textTransform: "uppercase",
      marginBottom: 14, display: "flex", alignItems: "center", gap: 12,
    }}>
      <span style={{ width: 24, height: 1, background: "#C9A22780", display: "inline-block" }} />
      {children}
    </div>
  );
}

function H2({ children, size = 42 }) {
  return (
    <h2 style={{
      fontFamily: "var(--f-serif)", fontSize: `clamp(26px, 4vw, ${size}px)`,
      fontWeight: 700, color: "var(--c-text)", lineHeight: 1.16,
      letterSpacing: "-0.01em", marginBottom: 16,
    }}>{children}</h2>
  );
}

function P({ children, style = {} }) {
  return (
    <p style={{
      fontFamily: "var(--f-body)", fontSize: 16, color: "var(--c-muted)",
      lineHeight: 1.75, maxWidth: 600, ...style,
    }}>{children}</p>
  );
}

function Pill({ children, color = "#64FFDA" }) {
  return (
    <span style={{
      fontFamily: "var(--f-mono)", fontSize: 10, fontWeight: 500,
      color, letterSpacing: "0.12em", textTransform: "uppercase",
      background: color + "10", padding: "4px 10px", borderRadius: 4,
      display: "inline-block",
    }}>{children}</span>
  );
}

// ── Flow Step (for architecture diagrams) ─────────────────
function FlowStep({ label, desc, accent = "#64FFDA", isLast = false }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 12, height: 12, borderRadius: "50%",
          background: accent, boxShadow: `0 0 10px ${accent}40`,
        }} />
        {!isLast && <div style={{ width: 1, height: 40, background: `${accent}25`, marginTop: 4 }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 12 }}>
        <div style={{ fontFamily: "var(--f-mono)", fontSize: 13, color: accent, fontWeight: 500, marginBottom: 4 }}>{label}</div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--c-muted)", lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────
function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { id: "case-study", label: "Case Study" },
    { id: "prototype", label: "Prototype" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(8,18,36,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.3)" : "none",
      borderBottom: scrolled ? "1px solid rgba(201,162,39,0.06)" : "none",
      transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 66,
      }}>
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => onNav("hero")}>
          <span style={{ fontFamily: "var(--f-serif)", fontWeight: 700, fontSize: 20, color: "var(--c-text)", letterSpacing: "0.06em" }}>Flow 🌊</span>
        </div>
        <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map(l => (
            <span key={l.id} onClick={() => onNav(l.id)}
              style={{
                fontFamily: "var(--f-body)", fontSize: 13, fontWeight: 500,
                color: active === l.id ? "#C9A227" : "var(--c-muted)",
                cursor: "pointer", letterSpacing: "0.04em", transition: "color 0.25s",
                textTransform: "uppercase",
              }}>{l.label}</span>
          ))}
          <a href="https://github.com/Priyanshunada04/Flow" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--c-muted)",
              border: "1px solid rgba(136,146,176,0.18)", borderRadius: 6,
              padding: "6px 14px", textDecoration: "none",
            }}>GitHub</a>
        </nav>
        <button className="nav-mobile-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-text)" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, top: 66, background: "rgba(8,18,36,0.97)",
          backdropFilter: "blur(24px)", padding: "48px clamp(16px, 4vw, 32px)", zIndex: 199,
          display: "flex", flexDirection: "column", gap: 24,
        }}>
          {links.map(l => (
            <span key={l.id} onClick={() => { onNav(l.id); setMenuOpen(false); }}
              style={{ fontFamily: "var(--f-serif)", fontSize: 26, color: "var(--c-text)", cursor: "pointer" }}>{l.label}</span>
          ))}
        </div>
      )}
    </header>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function FlowPortfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }, []);

  useEffect(() => {
    const ids = ["hero","case-study","philosophy","ecosystem","flow-split","flow-safe","flow-together","integration","prototype","business"];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.25 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,700;1,6..72,400&family=Outfit:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
        :root {
          --f-serif: 'Newsreader', Georgia, serif;
          --f-body: 'Outfit', -apple-system, sans-serif;
          --f-mono: 'Fira Code', 'Consolas', monospace;
          --c-bg: #081224;
          --c-surface: #0E1D35;
          --c-card: rgba(18,34,60,0.45);
          --c-text: #E8F0FE;
          --c-muted: #8A94AE;
          --c-gold: #C9A227;
          --c-teal: #64FFDA;
          --c-coral: #FF6B6B;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 76px; }
        body { background: var(--c-bg); color: var(--c-text); font-family: var(--f-body); -webkit-font-smoothing: antialiased; overflow-x: hidden; -webkit-tap-highlight-color: transparent; }
        button, a { touch-action: manipulation; }
        ::selection { background: rgba(201,162,39,0.25); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--c-bg); }
        ::-webkit-scrollbar-thumb { background: #172A46; border-radius: 3px; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .grid-2col, .grid-3col { grid-template-columns: 1fr !important; }
          .hero-metrics { flex-direction: column !important; }
          .proto-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .proto-inner .proto-arrow { justify-content: center !important; }
          .cross-app-grid { grid-template-columns: 1fr !important; }
          .philosophy-grid { grid-template-columns: 1fr 1fr !important; }
          .stat-row-wrap { gap: 16px !important; }
          .pricing-table { grid-template-columns: 1fr 1fr 1fr !important; font-size: 11px !important; }
          .bottom-bar-wrap { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
          .arch-connector { display: none !important; }
        }
        @media (max-width: 480px) {
          .philosophy-grid { grid-template-columns: 1fr !important; }
          .pricing-table { grid-template-columns: 1fr !important; }
          .scenario-actions { flex-wrap: wrap !important; }
        }
        @keyframes heroGlow { 0%,100% { opacity:0.3; } 50% { opacity:0.55; } }
        @keyframes pulse { 0%,100% { opacity:0.4; transform:scale(0.95); } 50% { opacity:1; transform:scale(1.05); } }
        .proto-card:hover { border-color: rgba(201,162,39,0.35) !important; transform: translateY(-4px) !important; box-shadow: 0 32px 80px rgba(0,0,0,0.4), 0 0 60px rgba(201,162,39,0.06) !important; }
        .proto-card:hover .proto-arrow { transform: translateX(6px) !important; }
      `}</style>

      <Nav active={activeSection} onNav={scrollTo} />

      {/* ═══════════════════════════════════════════════════ */}
      {/* HERO                                               */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", position: "relative", overflow: "hidden", padding: "clamp(100px, 14vw, 120px) 0 clamp(48px, 8vw, 80px)",
      }}>
        <div style={{
          position: "absolute", top: "12%", left: "50%", transform: "translateX(-50%)",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, rgba(100,255,218,0.03) 40%, transparent 70%)",
          animation: "heroGlow 8s ease-in-out infinite", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0, opacity: 0.02,
          backgroundImage: "linear-gradient(rgba(201,162,39,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)", position: "relative", zIndex: 1 }}>
          <Reveal delay={0.1}><Tag>AI-Native Financial Companion</Tag></Reveal>
          <Reveal delay={0.2}>
            <h1 style={{
              fontFamily: "var(--f-serif)", fontSize: "clamp(42px, 6.5vw, 74px)",
              fontWeight: 700, color: "var(--c-text)", lineHeight: 1.06,
              letterSpacing: "-0.025em", marginBottom: 26, maxWidth: 720,
            }}>
              Banking That<br />
              <span style={{
                background: "linear-gradient(135deg, #C9A227, #64FFDA)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Disappears</span>
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p style={{
              fontFamily: "var(--f-body)", fontSize: "clamp(15px, 2.5vw, 18px)", color: "var(--c-muted)",
              lineHeight: 1.75, maxWidth: 580, marginBottom: "clamp(24px, 4vw, 36px)", fontWeight: 300,
            }}>
              Flow is an AI-native, context-aware financial companion that lives where conversations already happen. It eliminates the friction of traditional finance apps by embedding intelligent money management directly into iMessage, Instagram, and Uber — not another app to download.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "clamp(36px, 6vw, 56px)" }}>
              <button onClick={() => scrollTo("case-study")} style={{
                fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 600,
                color: "#081224", background: "#C9A227", border: "none",
                borderRadius: 8, padding: "12px 28px", cursor: "pointer",
                flex: "1 1 auto", minWidth: 160,
              }}>View Case Study</button>
              <button onClick={() => scrollTo("prototype")} style={{
                fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 600,
                color: "#C9A227", background: "transparent",
                border: "1px solid rgba(201,162,39,0.35)",
                borderRadius: 8, padding: "12px 28px", cursor: "pointer",
                flex: "1 1 auto", minWidth: 160,
              }}>Explore Prototype</button>
            </div>
          </Reveal>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }} className="hero-metrics">
            {[
              { value: "$2.4T", label: "Deposit leakage addressed" },
              { value: "87%", label: "CAC reduction potential" },
              { value: "<100ms", label: "Transaction latency" },
            ].map((m, i) => (
              <Reveal key={i} delay={0.5 + i * 0.08} style={{ flex: "1 1 200px" }}>
                <div style={{
                  background: "rgba(201,162,39,0.04)", border: "1px solid rgba(201,162,39,0.1)",
                  borderRadius: 10, padding: "18px 22px", textAlign: "center",
                }}>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 22, fontWeight: 500, color: "#C9A227", marginBottom: 4 }}>{m.value}</div>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--c-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{m.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 01 — THE PROBLEM                                   */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section id="case-study">
        <Reveal><Tag>01 — The Problem</Tag></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "start" }} className="grid-2col">
          <div>
            <Reveal delay={0.05}><H2 size={38}>Gen Z doesn't bank — they Venmo, Cash App, and split bills in group chats.</H2></Reveal>
            <Reveal delay={0.12}>
              <P>Traditional banking apps are being abandoned at unprecedented rates. An entire generation treats finance as something that happens inside conversations, not institutions.</P>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: "clamp(12px, 3vw, 20px)", flexWrap: "wrap", marginTop: 36 }}>
                {[
                  { value: "66%", label: "Mobile-bank exclusively" },
                  { value: "59%", label: 'Want "invisible" transactions' },
                  { value: "78%", label: "One account from exhaustion" },
                ].map((s, i) => (
                  <div key={i} style={{ flex: "1 1 120px", borderLeft: "2px solid #C9A22740", paddingLeft: 18 }}>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: "clamp(24px, 4vw, 30px)", fontWeight: 500, color: "#64FFDA", lineHeight: 1.1 }}>{s.value}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--c-muted)", marginTop: 5 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.18}>
            <div style={{
              background: "var(--c-card)", border: "1px solid rgba(136,146,176,0.08)",
              borderRadius: 16, padding: "32px 24px", position: "relative", overflow: "hidden",
            }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--c-coral)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
                Research Synthesis
              </div>
              {[
                { pct: 66, label: "Mobile-bank exclusively", color: "#C9A227" },
                { pct: 59, label: "Want invisible transactions", color: "#64FFDA" },
                { pct: 78, label: "One account (exhaustion, not loyalty)", color: "#FF6B6B" },
              ].map((d, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--c-muted)" }}>{d.label}</span>
                    <span style={{ fontFamily: "var(--f-mono)", fontSize: 13, color: d.color, fontWeight: 500 }}>{d.pct}%</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(136,146,176,0.08)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${d.pct}%`, height: "100%", background: d.color, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "rgba(136,146,176,0.35)", marginTop: 14 }}>
                Sources: YouGov 2025, Bank of America, McKinsey
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 02 — CORE PHILOSOPHY                               */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section id="philosophy" bg="rgba(14,29,53,0.35)">
        <Reveal><Tag>02 — Core Philosophy</Tag></Reveal>
        <Reveal delay={0.05}><H2>What is Flow?</H2></Reveal>
        <Reveal delay={0.1}>
          <P style={{ marginBottom: 48, maxWidth: 680, fontSize: 17 }}>
            An AI-native, context-aware financial companion that lives where conversations already happen for Gen Z. It eliminates the friction of traditional finance apps by embedding intelligent money management directly into messaging platforms.
          </P>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(230px, 100%), 1fr))", gap: 18 }} className="philosophy-grid">
          {[
            { icon: "👻", title: "Invisible Until Needed", desc: "No app switching, no forms, no friction. Banking surfaces only at the moment of need, then disappears." },
            { icon: "💬", title: "Conversational by Design", desc: "Money talk happens in chats, so Flow meets users there. Natural language in, financial action out." },
            { icon: "🧠", title: "Predictive, Not Reactive", desc: "ML anticipates financial needs before users ask. Proactive guidance instead of post-hoc dashboards." },
            { icon: "👥", title: "Social by Default", desc: "Money is inherently social. Flow embraces splitting, sharing, and saving together as first-class behaviors." },
          ].map((p, i) => (
            <Reveal key={i} delay={0.14 + i * 0.06}>
              <div style={{
                background: "var(--c-card)", border: "1px solid rgba(136,146,176,0.08)",
                borderRadius: 14, padding: "28px 22px", height: "100%",
              }}>
                <div style={{ fontSize: 26, marginBottom: 14 }}>{p.icon}</div>
                <h3 style={{ fontFamily: "var(--f-serif)", fontSize: 17, fontWeight: 700, color: "var(--c-text)", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--c-muted)", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 03 — PLATFORM ECOSYSTEM                            */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section id="ecosystem">
        <Reveal><Tag>03 — Platform Ecosystem</Tag></Reveal>
        <Reveal delay={0.05}><H2>Three modules. One shared platform.</H2></Reveal>
        <Reveal delay={0.1}>
          <P style={{ marginBottom: 48 }}>
            Flow's three products — Split, Safe, and Together — sit atop a shared infrastructure layer that handles user profiles, bank/card APIs, ML intelligence, notifications, and security.
          </P>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{
            background: "var(--c-card)", border: "1px solid rgba(136,146,176,0.08)",
            borderRadius: 18, padding: "clamp(20px, 4vw, 36px) clamp(16px, 3vw, 32px)", marginBottom: 36,
          }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--c-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20, textAlign: "center" }}>
              FLOW PLATFORM ARCHITECTURE
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }} className="grid-3col">
              {[
                { name: "Flow Split", sub: "Reactive · Bill Splitting", color: "#64FFDA" },
                { name: "Flow Safe", sub: "Proactive · Cash Flow Guidance", color: "#C9A227" },
                { name: "Flow Together", sub: "Social · Group Savings", color: "#64FFDA" },
              ].map((m, i) => (
                <div key={i} style={{
                  background: m.color + "08", border: `1px solid ${m.color}20`,
                  borderRadius: 10, padding: "18px 16px", textAlign: "center",
                  cursor: "pointer", transition: "all 0.25s",
                }} onClick={() => scrollTo(["flow-split","flow-safe","flow-together"][i])}>
                  <div style={{ fontFamily: "var(--f-serif)", fontSize: 16, fontWeight: 700, color: "var(--c-text)", marginBottom: 4 }}>{m.name}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: m.color, letterSpacing: "0.06em" }}>{m.sub}</div>
                </div>
              ))}
            </div>
            <div className="arch-connector" style={{ display: "flex", justifyContent: "center", margin: "12px 0" }}>
              <svg width="200" height="24" viewBox="0 0 200 24">
                <line x1="30" y1="2" x2="30" y2="22" stroke="#C9A22730" strokeWidth="1"/>
                <line x1="100" y1="2" x2="100" y2="22" stroke="#C9A22730" strokeWidth="1"/>
                <line x1="170" y1="2" x2="170" y2="22" stroke="#C9A22730" strokeWidth="1"/>
                <line x1="30" y1="22" x2="170" y2="22" stroke="#C9A22730" strokeWidth="1"/>
                <line x1="100" y1="22" x2="100" y2="24" stroke="#C9A22730" strokeWidth="1"/>
              </svg>
            </div>
            <div style={{
              background: "rgba(201,162,39,0.04)", border: "1px dashed rgba(201,162,39,0.15)",
              borderRadius: 12, padding: "clamp(14px, 3vw, 20px) clamp(12px, 3vw, 24px)", textAlign: "center",
            }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "#C9A227", letterSpacing: "0.1em", marginBottom: 12 }}>
                SHARED INFRASTRUCTURE LAYER
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                {["User Profiles", "Bank/Card API", "ML Engine", "Notifications", "Security"].map(s => (
                  <span key={s} style={{
                    fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--c-muted)",
                    background: "rgba(136,146,176,0.06)", padding: "5px 12px", borderRadius: 5,
                    border: "1px solid rgba(136,146,176,0.08)",
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 04 — FLOW SPLIT                                    */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section id="flow-split" bg="rgba(14,29,53,0.35)">
        <Reveal><Tag>04 — Flow Split</Tag></Reveal>
        <Reveal delay={0.05}><H2>Reactive Splitting — divide costs where they happen.</H2></Reveal>
        <Reveal delay={0.1}>
          <P style={{ marginBottom: 40 }}>
            User has already spent money and needs to divide the cost. Flow Split detects natural language in iMessage, parses amounts and participants, and generates a rich payment card — all without leaving the conversation.
          </P>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="grid-2col">
          <Reveal delay={0.15}>
            <div style={{
              background: "var(--c-card)", border: "1px solid rgba(100,255,218,0.08)",
              borderRadius: 16, padding: "32px 24px",
            }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "#64FFDA", letterSpacing: "0.1em", marginBottom: 20 }}>USER FLOW</div>
              <FlowStep label="Entry Points" desc='Type "$94.50 split 3" in iMessage, tap Split on a transaction, long-press a message, or ask Siri.' />
              <FlowStep label="Parsing Engine" desc="NLP extracts amount, people, and item. Auto-suggests equal or itemized split. Fetches recent transaction data." />
              <FlowStep label="Rich Card in Chat" desc="Interactive card appears showing $31.50 each across 3 people. Options to Adjust or Send Request." accent="#C9A227" />
              <FlowStep label="Recipient Experience" desc="Receives request in their iMessage. One-tap to Approve, Modify, or Decline. Auto-links to Apple Pay." />
              <FlowStep label="Settlement Tracking" desc='Live "who paid" status. Reminder nudges for unpaid. Auto-mark settled when payment detected.' isLast />
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                width: 220, height: 440, background: "rgba(8,18,36,0.9)",
                border: "2px solid rgba(100,255,218,0.12)", borderRadius: 34,
                overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
              }}>
                <div style={{ width: 90, height: 22, background: "#060E1E", borderRadius: "0 0 14px 14px", margin: "0 auto" }} />
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--c-muted)", marginBottom: 10 }}>iMessage · Group Chat</div>
                  {[
                    { text: "dinner was $94.50 total 🍝", align: "left" },
                    { text: "split 3 ways?", align: "left" },
                    { text: "yes! 🙌", align: "right" },
                  ].map((msg, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: msg.align === "right" ? "flex-end" : "flex-start", marginBottom: 5 }}>
                      <div style={{
                        background: msg.align === "right" ? "rgba(201,162,39,0.12)" : "rgba(136,146,176,0.1)",
                        borderRadius: 14, padding: "7px 11px", maxWidth: "80%",
                        fontFamily: "var(--f-body)", fontSize: 10.5, color: "var(--c-text)",
                      }}>{msg.text}</div>
                    </div>
                  ))}
                  <div style={{
                    background: "linear-gradient(135deg, rgba(100,255,218,0.08), rgba(201,162,39,0.06))",
                    border: "1px solid rgba(100,255,218,0.15)", borderRadius: 14,
                    padding: "14px 14px 12px", marginTop: 12,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <span style={{ fontSize: 12 }}>🌊</span>
                      <span style={{ fontFamily: "var(--f-body)", fontSize: 8.5, color: "#64FFDA", fontWeight: 600, letterSpacing: "0.06em" }}>FLOW SPLIT</span>
                    </div>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 22, color: "var(--c-text)", fontWeight: 500 }}>$31.50</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 9, color: "var(--c-muted)", marginBottom: 10 }}>each · 3 people</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {["Sarah", "Marcus", "You"].map((n, i) => (
                        <div key={i} style={{ flex: 1, background: "rgba(100,255,218,0.06)", border: "1px solid rgba(100,255,218,0.1)", borderRadius: 8, padding: "6px 0", textAlign: "center", fontFamily: "var(--f-body)", fontSize: 9, color: "var(--c-muted)" }}>{n}</div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      <div style={{ flex: 1, background: "rgba(136,146,176,0.08)", borderRadius: 8, padding: "7px 0", textAlign: "center", fontFamily: "var(--f-body)", fontSize: 10, color: "var(--c-muted)" }}>Adjust</div>
                      <div style={{ flex: 2, background: "#C9A227", borderRadius: 8, padding: "7px 0", textAlign: "center", fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 600, color: "#081224" }}>Send Request</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 05 — FLOW SAFE                                     */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section id="flow-safe">
        <Reveal><Tag>05 — Flow Safe</Tag></Reveal>
        <Reveal delay={0.05}><H2>Proactive Guidance — ML predicts before you ask.</H2></Reveal>
        <Reveal delay={0.1}>
          <P style={{ marginBottom: 40 }}>
            Flow Safe continuously ingests transaction history, recurring bills, income schedules, and calendar data. Its ML engine calculates "safe to spend" amounts 7/14/30 days out and delivers contextual nudges exactly when they matter.
          </P>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="grid-2col">
          <Reveal delay={0.15}>
            <div style={{
              background: "var(--c-card)", border: "1px solid rgba(201,162,39,0.08)",
              borderRadius: 16, padding: "32px 24px",
            }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "#C9A227", letterSpacing: "0.1em", marginBottom: 20 }}>ML PIPELINE</div>
              <FlowStep label="Data Ingestion" desc="Transaction history, recurring bills (detected patterns), income schedule, upcoming payments from calendar." accent="#C9A227" />
              <FlowStep label="Prediction Engine" desc="Cash flow 7/14/30 days out. Anomaly detection for unusual spending. Safe-to-spend calculation. Risk scoring." accent="#C9A227" />
              <FlowStep label="Contextual Delivery" desc="Nudges delivered on lock screen, inline in iMessage, or via widgets — at the exact moment of decision." accent="#C9A227" />
              <FlowStep label="Adaptive Learning" desc="User corrections improve predictions. A/B tested nudge timing. Seasonal pattern adjustments." accent="#C9A227" isLast />
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "#C9A227", letterSpacing: "0.1em", marginBottom: 16 }}>CONTEXTUAL SCENARIOS</div>
              {[
                { tag: "About to Overspend", screen: "Lock Screen", message: "Coffee puts you $12 over today's safe spend", actions: ["Skip it", "I'm aware"], color: "#FF6B6B" },
                { tag: "Friend Invites to Dinner", screen: "iMessage Inline", message: "Based on rent due Friday, safe spend: $67", actions: ["Suggest cheaper spot"], color: "#C9A227" },
                { tag: "Paycheck Deposited", screen: "Widget", message: "$2,400 in. Auto-saved $200. Safe to spend: $340/week", actions: ["Adjust savings"], color: "#64FFDA" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: "var(--c-card)", border: "1px solid rgba(136,146,176,0.08)",
                  borderRadius: 12, padding: "20px 18px", marginBottom: 12,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                    <Pill color={s.color}>{s.tag}</Pill>
                    <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--c-muted)" }}>via {s.screen}</span>
                  </div>
                  <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--c-text)", lineHeight: 1.5, marginBottom: 10 }}>"{s.message}"</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {s.actions.map(a => (
                      <span key={a} style={{
                        fontFamily: "var(--f-mono)", fontSize: 10, color: s.color,
                        background: s.color + "10", padding: "4px 10px", borderRadius: 5,
                      }}>{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 06 — FLOW TOGETHER                                 */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section id="flow-together" bg="rgba(14,29,53,0.35)">
        <Reveal><Tag>06 — Flow Together</Tag></Reveal>
        <Reveal delay={0.05}><H2>Social Saving — group goals in group chats.</H2></Reveal>
        <Reveal delay={0.1}>
          <P style={{ marginBottom: 40 }}>
            A group wants to save toward a shared goal. Flow Together creates savings pots directly inside iMessage group chats — with progress tracking, contribution scheduling, milestone celebrations, and gentle accountability nudges.
          </P>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="grid-2col">
          <Reveal delay={0.15}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                width: 240, background: "var(--c-card)", border: "1px solid rgba(100,255,218,0.1)",
                borderRadius: 20, padding: "24px 20px",
              }}>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--c-muted)", marginBottom: 14 }}>iMessage · Spring Break Group</div>
                <div style={{
                  background: "linear-gradient(135deg, rgba(100,255,218,0.08), rgba(201,162,39,0.04))",
                  border: "1px solid rgba(100,255,218,0.12)", borderRadius: 16, padding: "20px 16px",
                }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>🏖️</div>
                  <div style={{ fontFamily: "var(--f-serif)", fontSize: 16, fontWeight: 700, color: "var(--c-text)", marginBottom: 4 }}>CABO SPRING BREAK</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--c-muted)", marginBottom: 12 }}>$1,240 of $2,000 · 62%</div>
                  <div style={{ height: 6, background: "rgba(136,146,176,0.1)", borderRadius: 3, marginBottom: 14, overflow: "hidden" }}>
                    <div style={{ width: "62%", height: "100%", background: "linear-gradient(90deg, #64FFDA, #C9A227)", borderRadius: 3 }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
                    {[
                      { name: "Sarah", amt: "$400" }, { name: "Marcus", amt: "$340" },
                      { name: "You", amt: "$300" }, { name: "Alex", amt: "$200" },
                    ].map((c, i) => (
                      <div key={i} style={{
                        background: "rgba(136,146,176,0.06)", borderRadius: 8, padding: "6px 8px",
                        fontFamily: "var(--f-body)", fontSize: 10, color: "var(--c-muted)",
                        display: "flex", justifyContent: "space-between",
                      }}>
                        <span>{c.name}</span>
                        <span style={{ color: "#64FFDA", fontFamily: "var(--f-mono)", fontSize: 10 }}>{c.amt}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ flex: 1, background: "#64FFDA", borderRadius: 8, padding: "8px 0", textAlign: "center", fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 600, color: "#081224" }}>Contribute</div>
                    <div style={{ flex: 1, background: "rgba(136,146,176,0.1)", borderRadius: 8, padding: "8px 0", textAlign: "center", fontFamily: "var(--f-body)", fontSize: 10, color: "var(--c-muted)" }}>Boost Goal</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.18}>
              <div style={{
                background: "var(--c-card)", border: "1px solid rgba(136,146,176,0.08)",
                borderRadius: 16, padding: "28px 22px", marginBottom: 16,
              }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "#64FFDA", letterSpacing: "0.1em", marginBottom: 16 }}>USER FLOW</div>
                <FlowStep label="Pot Creation" desc='"Start a Pot" in iMessage group. Set goal name, target amount, deadline. Auto-adds chat participants.' />
                <FlowStep label="Contributions" desc="One-tap from chat. Scheduled auto-add ($50/week). Round-ups from spare change." accent="#C9A227" />
                <FlowStep label="Milestones" desc='25%: celebration message. 50%: group animation. 90%: urgency nudge. Streak tracking with fire badges.' />
                <FlowStep label="Goal Completion" desc="Auto-disburse or manual release. Celebration in chat. Suggest next pot. Memory/photo album." isLast />
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <div style={{
                background: "rgba(201,162,39,0.04)", border: "1px solid rgba(201,162,39,0.1)",
                borderRadius: 12, padding: "16px 18px",
              }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "#C9A227", letterSpacing: "0.08em", marginBottom: 8 }}>ACCOUNTABILITY MECHANICS</div>
                <p style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--c-muted)", lineHeight: 1.6 }}>
                  Gentle reminders for laggers. Streak tracking with fire badges. Opt-in contribution visibility. Social pressure through celebration, not shame.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 07 — CROSS-APP INTEGRATION                         */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section id="integration">
        <Reveal><Tag>07 — Cross-App Intelligence</Tag></Reveal>
        <Reveal delay={0.05}><H2>Products that talk to each other.</H2></Reveal>
        <Reveal delay={0.1}>
          <P style={{ marginBottom: 48 }}>
            Flow's three modules aren't siloed. The shared ML engine creates intelligent handoffs between Split, Safe, and Together — turning isolated actions into a connected financial experience.
          </P>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 18 }}>
          {[
            {
              from: "Flow Safe", to: "Flow Split", color: "#C9A227",
              flow: [
                'Safe notification: "Dinner will put you over"',
                "User proceeds anyway",
                "Auto-suggests Split creation",
                '"Split this $85 to stay on track?"',
              ],
            },
            {
              from: "Flow Together", to: "Flow Split", color: "#64FFDA",
              flow: [
                "Group pot reaches 100% ($2,000 saved)",
                "Final booking costs $2,340",
                '"Split $340 overage 4 ways?"',
              ],
            },
            {
              from: "Flow Split", to: "Flow Safe", color: "#FF6B6B",
              flow: [
                "User splits bills frequently with same person",
                '"You and Sarah split 8x/month"',
                '"Create shared pot for recurring expenses?"',
              ],
            },
          ].map((link, i) => (
            <Reveal key={i} delay={0.14 + i * 0.08}>
              <div style={{
                background: "var(--c-card)", border: "1px solid rgba(136,146,176,0.08)",
                borderRadius: 14, padding: "28px 22px", height: "100%",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
                  <Pill color={link.color}>{link.from}</Pill>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={link.color} strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  <Pill color={link.color}>{link.to}</Pill>
                </div>
                {link.flow.map((step, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: link.color + "50", marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--c-muted)", lineHeight: 1.5 }}>{step}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 08 — PROTOTYPES                                    */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section id="prototype" bg="rgba(14,29,53,0.35)">
        <Reveal><Tag>08 — Interactive Prototypes</Tag></Reveal>
        <Reveal delay={0.05}><H2>Experience Flow — live.</H2></Reveal>
        <Reveal delay={0.1}>
          <P style={{ marginBottom: 48 }}>
            Tap through fully interactive Figma prototypes for Flow Split and Flow Safe. Built with native iOS patterns, real interaction states, and production-level detail.
          </P>
        </Reveal>

        {/* ── Flow Split Prototype ── */}
        <Reveal delay={0.16}>
          <a href="https://www.figma.com/make/wkKulpcf5Upid6V0bKaK5L/Flow-Split-iOS-Prototype?fullscreen=1&t=SMKJe9FIKXgqBdK6-1"
            target="_blank" rel="noopener noreferrer" className="proto-card proto-inner"
            style={{
              display: "flex", gap: "clamp(24px, 4vw, 40px)", alignItems: "center", flexWrap: "wrap",
              textDecoration: "none", borderRadius: 20, padding: "clamp(24px, 4vw, 36px) clamp(20px, 4vw, 32px)",
              background: "var(--c-card)", border: "1px solid rgba(100,255,218,0.1)",
              transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", position: "relative",
              marginBottom: 20,
            }}>
            {/* Phone mockup */}
            <div style={{
              width: 150, height: 290, background: "rgba(8,18,36,0.9)",
              border: "2px solid rgba(100,255,218,0.12)", borderRadius: 26,
              overflow: "hidden", flexShrink: 0, boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}>
              <div style={{ width: 65, height: 16, background: "#060E1E", borderRadius: "0 0 10px 10px", margin: "0 auto" }} />
              <div style={{ padding: "10px 11px" }}>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 7.5, color: "var(--c-muted)", marginBottom: 5 }}>iMessage</div>
                {["dinner was $94.50", "split 3 ways?", "yes! 🙌"].map((t, i) => (
                  <div key={i} style={{
                    background: i === 2 ? "rgba(201,162,39,0.1)" : "rgba(136,146,176,0.08)",
                    borderRadius: 9, padding: "4px 7px", marginBottom: 2.5,
                    fontFamily: "var(--f-body)", fontSize: 7.5, color: "var(--c-text)",
                    maxWidth: "78%", marginLeft: i === 2 ? "auto" : 0,
                  }}>{t}</div>
                ))}
                <div style={{
                  background: "linear-gradient(135deg, rgba(100,255,218,0.08), rgba(201,162,39,0.06))",
                  border: "1px solid rgba(100,255,218,0.12)", borderRadius: 9,
                  padding: "7px", marginTop: 5, textAlign: "center",
                }}>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 13, color: "var(--c-text)", fontWeight: 500 }}>$31.50</div>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 6.5, color: "var(--c-muted)" }}>each · 3 people</div>
                  <div style={{ background: "#64FFDA", borderRadius: 5, padding: "3.5px 0", marginTop: 5, fontFamily: "var(--f-body)", fontSize: 7.5, fontWeight: 600, color: "#081224" }}>Send Request</div>
                </div>
              </div>
            </div>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#64FFDA", boxShadow: "0 0 10px rgba(100,255,218,0.5)", animation: "pulse 2s infinite" }} />
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "#64FFDA", letterSpacing: "0.08em", textTransform: "uppercase" }}>Live Prototype</span>
              </div>
              <h3 style={{ fontFamily: "var(--f-serif)", fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 700, color: "var(--c-text)", marginBottom: 8 }}>
                Flow Split — Reactive Splitting
              </h3>
              <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--c-muted)", lineHeight: 1.65, marginBottom: 18, maxWidth: 400 }}>
                Complete bill-splitting flow from iMessage conversation to instant settlement. NLP parsing, rich payment cards, recipient approval, and live tracking.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
                {[{ l: "Screens", v: "12+" }, { l: "Platform", v: "iOS" }, { l: "Flow", v: "End-to-end" }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "#64FFDA", fontWeight: 500 }}>{s.v}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--c-muted)", marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="proto-arrow" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 600, color: "#64FFDA",
                transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}>
                Launch Flow Split
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64FFDA" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </a>
        </Reveal>

        {/* ── Flow Safe Prototype ── */}
        <Reveal delay={0.24}>
          <a href="https://www.figma.com/make/vSadqxByG8BfhBhh9dAe1x/Flow-Safe-Screen-Design?fullscreen=1&t=2Ffu9agxOkHFCN41-1"
            target="_blank" rel="noopener noreferrer" className="proto-card proto-inner"
            style={{
              display: "flex", gap: "clamp(24px, 4vw, 40px)", alignItems: "center", flexWrap: "wrap",
              textDecoration: "none", borderRadius: 20, padding: "clamp(24px, 4vw, 36px) clamp(20px, 4vw, 32px)",
              background: "var(--c-card)", border: "1px solid rgba(201,162,39,0.1)",
              transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", position: "relative",
            }}>
            {/* Phone mockup — Flow Safe */}
            <div style={{
              width: 150, height: 290, background: "rgba(8,18,36,0.9)",
              border: "2px solid rgba(201,162,39,0.12)", borderRadius: 26,
              overflow: "hidden", flexShrink: 0, boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}>
              <div style={{ width: 65, height: 16, background: "#060E1E", borderRadius: "0 0 10px 10px", margin: "0 auto" }} />
              <div style={{ padding: "10px 11px" }}>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 7.5, color: "var(--c-muted)", marginBottom: 8 }}>Flow Safe</div>
                {/* Safe to spend widget */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(201,162,39,0.1), rgba(201,162,39,0.04))",
                  border: "1px solid rgba(201,162,39,0.15)", borderRadius: 10, padding: "10px 9px", marginBottom: 8,
                }}>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 6.5, color: "#C9A227", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 4 }}>SAFE TO SPEND</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 20, color: "var(--c-text)", fontWeight: 500, marginBottom: 2 }}>$340</div>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 6.5, color: "var(--c-muted)" }}>this week · rent due Fri</div>
                  {/* Mini bar */}
                  <div style={{ height: 3, background: "rgba(136,146,176,0.1)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
                    <div style={{ width: "62%", height: "100%", background: "linear-gradient(90deg, #C9A227, #64FFDA)", borderRadius: 2 }} />
                  </div>
                </div>
                {/* Nudge card */}
                <div style={{
                  background: "rgba(255,107,107,0.06)", border: "1px solid rgba(255,107,107,0.12)",
                  borderRadius: 8, padding: "7px 8px",
                }}>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 6.5, color: "#FF6B6B", fontWeight: 600, marginBottom: 3 }}>HEADS UP</div>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 7.5, color: "var(--c-text)", lineHeight: 1.4, marginBottom: 5 }}>Coffee puts you $12 over today's safe spend</div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <div style={{ flex: 1, background: "rgba(255,107,107,0.08)", borderRadius: 5, padding: "3px 0", textAlign: "center", fontFamily: "var(--f-body)", fontSize: 7, color: "#FF6B6B" }}>Skip it</div>
                    <div style={{ flex: 1, background: "rgba(136,146,176,0.08)", borderRadius: 5, padding: "3px 0", textAlign: "center", fontFamily: "var(--f-body)", fontSize: 7, color: "var(--c-muted)" }}>I'm aware</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C9A227", boxShadow: "0 0 10px rgba(201,162,39,0.5)", animation: "pulse 2s infinite" }} />
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "#C9A227", letterSpacing: "0.08em", textTransform: "uppercase" }}>Live Prototype</span>
              </div>
              <h3 style={{ fontFamily: "var(--f-serif)", fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 700, color: "var(--c-text)", marginBottom: 8 }}>
                Flow Safe — Proactive Guidance
              </h3>
              <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--c-muted)", lineHeight: 1.65, marginBottom: 18, maxWidth: 400 }}>
                ML-powered spending intelligence with safe-to-spend predictions, contextual nudges on lock screen and iMessage, and adaptive cash flow guidance.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
                {[{ l: "Predictions", v: "7/14/30d" }, { l: "Delivery", v: "Contextual" }, { l: "ML", v: "Adaptive" }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "#C9A227", fontWeight: 500 }}>{s.v}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--c-muted)", marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="proto-arrow" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 600, color: "#C9A227",
                transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}>
                Launch Flow Safe
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </a>
        </Reveal>

        {/* ── Flow Together Prototype ── */}
        <Reveal delay={0.32}>
          <a href="https://www.figma.com/make/Y65Vnl0xgmKYscizOWLdkf/Flow-Together-Screen?fullscreen=1&t=a5U2epHGaQmqCfp5-1" 
            target="_blank" rel="noopener noreferrer" className="proto-card proto-inner"
            style={{
              display: "flex", gap: "clamp(24px, 4vw, 40px)", alignItems: "center", flexWrap: "wrap",
              textDecoration: "none", borderRadius: 20, padding: "clamp(24px, 4vw, 36px) clamp(20px, 4vw, 32px)",
              background: "var(--c-card)", border: "1px solid rgba(100,255,218,0.1)",
              transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", position: "relative",
            }}>
            {/* Phone mockup — Flow Together */}
            <div style={{
              width: 150, height: 290, background: "rgba(8,18,36,0.9)",
              border: "2px solid rgba(100,255,218,0.12)", borderRadius: 26,
              overflow: "hidden", flexShrink: 0, boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}>
              <div style={{ width: 65, height: 16, background: "#060E1E", borderRadius: "0 0 10px 10px", margin: "0 auto" }} />
              <div style={{ padding: "10px 11px" }}>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 7.5, color: "var(--c-muted)", marginBottom: 6 }}>iMessage · Group</div>
                {/* Pot dashboard card */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(100,255,218,0.08), rgba(201,162,39,0.04))",
                  border: "1px solid rgba(100,255,218,0.12)", borderRadius: 10, padding: "9px 8px",
                }}>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>🏖️</div>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 8, fontWeight: 700, color: "var(--c-text)", marginBottom: 2 }}>CABO SPRING BREAK</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 7, color: "var(--c-muted)", marginBottom: 6 }}>$1,240 / $2,000 · 62%</div>
                  {/* Progress bar */}
                  <div style={{ height: 4, background: "rgba(136,146,176,0.1)", borderRadius: 2, marginBottom: 8, overflow: "hidden" }}>
                    <div style={{ width: "62%", height: "100%", background: "linear-gradient(90deg, #64FFDA, #C9A227)", borderRadius: 2 }} />
                  </div>
                  {/* Contributors */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 6 }}>
                    {[{ n: "Sarah", a: "$400", fire: true }, { n: "Marcus", a: "$340" }, { n: "You", a: "$300" }, { n: "Alex", a: "$200" }].map((c, i) => (
                      <div key={i} style={{
                        background: "rgba(136,146,176,0.06)", borderRadius: 5, padding: "3px 5px",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        fontFamily: "var(--f-body)", fontSize: 6.5, color: "var(--c-muted)",
                      }}>
                        <span>{c.n}{c.fire ? " 🔥" : ""}</span>
                        <span style={{ color: "#64FFDA", fontFamily: "var(--f-mono)", fontSize: 6.5 }}>{c.a}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 3 }}>
                    <div style={{ flex: 1, background: "#64FFDA", borderRadius: 5, padding: "3.5px 0", textAlign: "center", fontFamily: "var(--f-body)", fontSize: 7, fontWeight: 600, color: "#081224" }}>Contribute</div>
                    <div style={{ flex: 1, background: "rgba(136,146,176,0.08)", borderRadius: 5, padding: "3.5px 0", textAlign: "center", fontFamily: "var(--f-body)", fontSize: 7, color: "var(--c-muted)" }}>Boost</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#64FFDA", boxShadow: "0 0 10px rgba(100,255,218,0.5)", animation: "pulse 2s infinite" }} />
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "#64FFDA", letterSpacing: "0.08em", textTransform: "uppercase" }}>Live Prototype</span>
              </div>
              <h3 style={{ fontFamily: "var(--f-serif)", fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 700, color: "var(--c-text)", marginBottom: 8 }}>
                Flow Together — Social Savings
              </h3>
              <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--c-muted)", lineHeight: 1.65, marginBottom: 18, maxWidth: 400 }}>
                Group savings pots inside iMessage. Create goals, track contributions, celebrate milestones, and hold friends accountable — all without leaving the chat.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
                {[{ l: "Goals", v: "Shared" }, { l: "Milestones", v: "25/50/75/100%" }, { l: "Social", v: "Streaks" }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "#64FFDA", fontWeight: 500 }}>{s.v}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--c-muted)", marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="proto-arrow" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 600, color: "#64FFDA",
                transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}>
                Launch Flow Together
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64FFDA" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </a>
        </Reveal>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 09 — BUSINESS MODEL                                */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section id="business" bg="rgba(14,29,53,0.35)">
        <Reveal><Tag>09 — Business Model</Tag></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "start" }} className="grid-2col">
          <div>
            <Reveal delay={0.05}><H2>SaaS + usage pricing for Tier 1-2 banks.</H2></Reveal>
            <Reveal delay={0.1}>
              <P>Clear path to $12M ARR by Year 3. Revenue scales with transaction volume — the more embedded banking succeeds, the more Flow earns.</P>
            </Reveal>
            <Reveal delay={0.18}>
              <div style={{ display: "flex", gap: "clamp(12px, 3vw, 20px)", flexWrap: "wrap", marginTop: 32 }}>
                {[
                  { value: "$12M", label: "ARR target Year 3" },
                  { value: "SaaS+", label: "Usage pricing" },
                  { value: "Tier 1-2", label: "Bank segment" },
                ].map((s, i) => (
                  <div key={i} style={{ borderLeft: "2px solid #C9A22740", paddingLeft: 16, flex: "1 1 100px" }}>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 28, fontWeight: 500, color: "#64FFDA" }}>{s.value}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--c-muted)", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.18}>
            <div style={{
              background: "var(--c-card)", border: "1px solid rgba(136,146,176,0.08)",
              borderRadius: 14, overflow: "hidden",
            }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(136,146,176,0.06)" }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--c-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Pricing Tiers</span>
              </div>
              {[
                { tier: "Tier 1", target: "Top 20 Banks", price: "Custom Enterprise" },
                { tier: "Tier 2", target: "Regional Banks", price: "$50K+/yr + usage" },
                { tier: "Credit Union", target: "CU Networks", price: "$25K+/yr + usage" },
              ].map((row, i) => (
                <div key={i} className="pricing-table" style={{
                  display: "grid", gridTemplateColumns: "0.8fr 1fr 1.2fr", padding: "14px clamp(12px, 3vw, 20px)",
                  borderBottom: i < 2 ? "1px solid rgba(136,146,176,0.04)" : "none",
                  background: i === 1 ? "rgba(201,162,39,0.03)" : "transparent",
                }}>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "#C9A227" }}>{row.tier}</span>
                  <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--c-muted)" }}>{row.target}</span>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--c-text)" }}>{row.price}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(136,146,176,0.06)", padding: "clamp(20px, 4vw, 32px) 0" }}>
        <div style={{
          maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)",
          display: "flex", justifyContent: "center", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "var(--f-serif)", fontWeight: 700, fontSize: 14, color: "var(--c-text)" }}>Flow 🌊</span>
            <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(136,146,176,0.35)" }}>© 2026 All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
