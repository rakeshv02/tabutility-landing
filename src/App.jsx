import React, { useState, useEffect } from "react";
import toolsConfig from "./tools.config.json";

const colorMap = {
  Calculators: { icon: "#2563eb", light: "#EFF6FF" },
  "Image Tools": { icon: "#10b981", light: "#ECFDF5" },
  "Developer Tools": { icon: "#f59e0b", light: "#FFFBEB" },
  "Content Tools": { icon: "#ec4899", light: "#FDF2F8" },
  Wellness: { icon: "#8b5cf6", light: "#F7F1FF" },
};

const faqs = [
  {
    q: "Are all tools truly free?",
    a: "Yes. All 12 utility tools are 100% free forever with no sign-up required. Our 3 hybrid tools (Email Writer, Content Repurposer, AI Summarizer) offer free tiers with optional paid upgrades for power users.",
  },
  {
    q: "Do you store my data?",
    a: "No. All utility tools run entirely in your browser—nothing is sent to our servers. We never store, log, or use your data. Hybrid tools store your preferences to improve results, but you can delete anytime.",
  },
  {
    q: "Why are these tools free?",
    a: "We believe useful tools should be accessible to everyone. We're supported by Google AdSense ads, which may use cookies to show relevant ads based on your browsing. We never sell your data. You can decline cookies in the banner at the bottom of the page and ads will still show — just not personalised.",
  },
  {
    q: "How often are new tools added?",
    a: "We're building in public. New tools launch regularly as we identify problems worth solving. Follow us on Reddit and Indie Hackers for updates.",
  },
  {
    q: "Can I use these tools offline?",
    a: "Yes. Most utility tools work offline. Hybrid tools need internet for AI features, but your data stays private.",
  },
];

const valueProps = [
  {
    title: "Private by Default",
    desc: "Everything you type into our tools runs locally in your browser — never sent to our servers. Ads are served by Google AdSense.",
    color: "#27C281",
    light: "#EEFBF5",
    emoji: "🔒",
  },
  {
    title: "100% Free",
    desc: "No hidden fees, no credit card required. Free tools forever.",
    color: "#4B7FED",
    light: "#EEF1FF",
    emoji: "💰",
  },
  {
    title: "No Sign-up",
    desc: "Jump straight into solving your problem without creating an account.",
    color: "#FF7A3B",
    light: "#FFF4EE",
    emoji: "🚀",
  },
  {
    title: "Built in Public",
    desc: "Follow the journey. See revenue, wins, and real numbers.",
    color: "#9B6EDE",
    light: "#F7F1FF",
    emoji: "📊",
  },
];

export default function App() {
  const [expandedFaq, setExpandedFaq]     = useState(null);
  const [showMoreTools, setShowMoreTools] = useState({});
  const [scrolled, setScrolled]           = useState(false);
  const [modal, setModal]                 = useState(null); // 'privacy' | 'terms' | null
  const [cookieConsent, setCookieConsent] = useState(null); // null | 'accepted' | 'declined'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Read saved cookie consent on first load
  useEffect(() => {
    const saved = localStorage.getItem('tabutility_cookie_consent');
    if (saved) setCookieConsent(saved);
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('tabutility_cookie_consent', 'accepted');
    setCookieConsent('accepted');
  };

  const handleCookieDecline = () => {
    localStorage.setItem('tabutility_cookie_consent', 'declined');
    setCookieConsent('declined');
  };

  // Sort categories by tool count descending so fuller sections appear first
  const sortedCategories = Object.entries(toolsConfig.categories).sort(
    ([, a], [, b]) => b.tools.length - a.tools.length,
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f7f4",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: "#0f172a",
        margin: 0,
        padding: 0,
      }}
    >
      {/* ── Nav ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "12px 32px" : "20px 32px",
          background: scrolled ? "rgba(248,247,244,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.05)" : "none",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "#0f172a",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 18,
            }}
          >
            ⌘
          </div>
          Tabutility
        </div>
        <div
          style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500 }}
        >
          {["Tools", "FAQ", "About"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{ color: "#64748b", textDecoration: "none" }}
              onMouseEnter={(e) => (e.target.style.color = "#0f172a")}
              onMouseLeave={(e) => (e.target.style.color = "#64748b")}
            >
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 80,
          paddingLeft: 24,
          paddingRight: 24,
          textAlign: "center",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.08)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#475569",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#22c55e",
              display: "inline-block",
            }}
          ></span>
          Free Tools, No Paywalls
        </div>
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            margin: "0 0 24px",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            color: "#0f172a",
          }}
        >
          Tools That Actually
          <br />
          <span style={{ color: "#4B7FED" }}>Respect You.</span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#64748b",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto 36px",
          }}
        >
          15 browser-based utilities for text, dev, wellness, and daily tasks.
          Your tool data never leaves your browser. No paywalls, no sign-ups — kept free by non-intrusive Google ads.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#tools"
            style={{
              padding: "14px 28px",
              background: "#0f172a",
              color: "white",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(15,23,42,0.22)",
              display: "inline-block",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            Explore Tools
          </a>
          <a
            href="#about"
            style={{
              padding: "14px 28px",
              background: "white",
              color: "#334155",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            Read the Story
          </a>
        </div>
      </section>

      {/* ── AdSense Slot 1 ──────────────────────────────────────────────
           When approved, replace this comment with your <ins> tag:
           <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true" />
      ─────────────────────────────────────────────────────────────── */}

      {/* ── Value Props ── */}
      <section
        style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {valueProps.map((p, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: 20,
                padding: "28px 24px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 4px 20px -4px rgba(0,0,0,0.06)",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 8px 30px -4px rgba(0,0,0,0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 20px -4px rgba(0,0,0,0.06)")
              }
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: p.light,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  color: p.color,
                  fontSize: 24,
                }}
              >
                {p.emoji}
              </div>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "#64748b",
                  lineHeight: 1.6,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tools ── */}
      <section
        id="tools"
        style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 8px",
              letterSpacing: "-0.5px",
            }}
          >
            15 Tools Built for You
          </h2>
          <p style={{ color: "#64748b", margin: 0, fontSize: 15 }}>
            No sign-up, no tracking, completely free.
          </p>
        </div>

        {(() => {
          const multiCategories = sortedCategories.filter(
            ([, c]) => c.tools.length > 1,
          );
          const singleCategories = sortedCategories.filter(
            ([, c]) => c.tools.length === 1,
          );

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {/* ── Multi-tool categories (full width) ── */}
              {multiCategories.map(([key, category]) => {
                const colors = colorMap[category.name] || {
                  icon: "#6b7280",
                  light: "#f3f4f6",
                };
                const isExpanded = showMoreTools[key];
                const toolsToShow = isExpanded
                  ? category.tools
                  : category.tools.slice(0, 4);
                const hasMore = category.tools.length > 4;
                return (
                  <div key={key}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          background: colors.light,
                          borderRadius: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: colors.icon,
                          fontSize: 20,
                          fontWeight: 700,
                        }}
                      >
                        {category.emoji}
                      </div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {category.name}
                      </h3>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: 16,
                      }}
                    >
                      {toolsToShow.map((tool) => (
                        <a
                          key={tool.id}
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: 16,
                            background: "white",
                            borderRadius: 14,
                            border: "1px solid #e2e8f0",
                            textDecoration: "none",
                            color: "#0f172a",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = colors.icon;
                            e.currentTarget.style.boxShadow =
                              "0 8px 20px rgba(0,0,0,0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#e2e8f0";
                            e.currentTarget.style.boxShadow =
                              "0 2px 8px rgba(0,0,0,0.03)";
                          }}
                        >
                          <div
                            style={{
                              width: 40,
                              height: 40,
                              background: colors.light,
                              borderRadius: 8,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: 12,
                            }}
                          >
                            <span style={{ fontSize: 22 }}>{tool.emoji}</span>
                          </div>
                          <h4
                            style={{
                              margin: "0 0 6px",
                              fontSize: 15,
                              fontWeight: 700,
                              color: "#0f172a",
                            }}
                          >
                            {tool.name}
                          </h4>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 13,
                              color: "#64748b",
                              lineHeight: 1.55,
                              flexGrow: 1,
                            }}
                          >
                            {tool.description}
                          </p>
                        </a>
                      ))}
                    </div>
                    {hasMore && (
                      <button
                        onClick={() =>
                          setShowMoreTools((p) => ({ ...p, [key]: !p[key] }))
                        }
                        style={{
                          marginTop: 14,
                          padding: "8px 16px",
                          background: "white",
                          color: "#475569",
                          border: "1px solid #e2e8f0",
                          borderRadius: 8,
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#f8fafc")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "white")
                        }
                      >
                        {isExpanded
                          ? "Show less ▴"
                          : `See ${category.tools.length - 4} more ▾`}
                      </button>
                    )}
                  </div>
                );
              })}

              {/* ── Single-tool categories → 2-column grid ── */}
              {singleCategories.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: 24,
                  }}
                >
                  {singleCategories.map(([key, category]) => {
                    const colors = colorMap[category.name] || {
                      icon: "#6b7280",
                      light: "#f3f4f6",
                    };
                    const tool = category.tools[0];
                    return (
                      <div key={key}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 16,
                          }}
                        >
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              background: colors.light,
                              borderRadius: 12,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: colors.icon,
                              fontSize: 20,
                              fontWeight: 700,
                            }}
                          >
                            {category.emoji}
                          </div>
                          <h3
                            style={{
                              margin: 0,
                              fontSize: 18,
                              fontWeight: 700,
                              color: "#0f172a",
                            }}
                          >
                            {category.name}
                          </h3>
                        </div>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            padding: "18px 20px",
                            background: "white",
                            borderRadius: 16,
                            border: "1px solid #e2e8f0",
                            textDecoration: "none",
                            color: "#0f172a",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = colors.icon;
                            e.currentTarget.style.boxShadow =
                              "0 8px 20px rgba(0,0,0,0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#e2e8f0";
                            e.currentTarget.style.boxShadow =
                              "0 2px 8px rgba(0,0,0,0.03)";
                          }}
                        >
                          <div
                            style={{
                              flexShrink: 0,
                              width: 48,
                              height: 48,
                              background: colors.light,
                              borderRadius: 12,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 26,
                            }}
                          >
                            {tool.emoji}
                          </div>
                          <div>
                            <h4
                              style={{
                                margin: "0 0 4px",
                                fontSize: 15,
                                fontWeight: 700,
                                color: "#0f172a",
                              }}
                            >
                              {tool.name}
                            </h4>
                            <p
                              style={{
                                margin: 0,
                                fontSize: 13,
                                color: "#64748b",
                                lineHeight: 1.55,
                              }}
                            >
                              {tool.description}
                            </p>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}
      </section>

      {/* ── AdSense Slot 2 ──────────────────────────────────────────────
           When approved, replace this comment with your <ins> tag:
           <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true" />
      ─────────────────────────────────────────────────────────────── */}

      {/* ── FAQ ── */}
      <section
        id="faq"
        style={{ padding: "64px 24px", maxWidth: 720, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 8px",
              letterSpacing: "-0.5px",
            }}
          >
            Questions?
          </h2>
          <p style={{ color: "#64748b", margin: 0, fontSize: 15 }}>
            Everything you need to know about Tabutility.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {faqs.map((f, i) => {
            const open = expandedFaq === i;
            return (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 16,
                  border: open ? "1px solid #cbd5e1" : "1px solid #e2e8f0",
                  boxShadow: open ? "0 4px 16px rgba(0,0,0,0.06)" : "none",
                  overflow: "hidden",
                  transition: "all 0.2s",
                }}
              >
                <button
                  onClick={() => setExpandedFaq(open ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    padding: "18px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#0f172a",
                      lineHeight: 1.4,
                    }}
                  >
                    {f.q}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: open ? "#0f172a" : "#f1f5f9",
                      color: open ? "white" : "#64748b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      transform: open ? "rotate(180deg)" : "none",
                      transition: "all 0.25s",
                    }}
                  >
                    ▼
                  </span>
                </button>
                {open && (
                  <div
                    style={{
                      padding: "0 24px 20px",
                      fontSize: 14,
                      color: "#475569",
                      lineHeight: 1.75,
                    }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Request a Tool ── */}
      <section style={{ padding: '0 24px 64px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #fdf4ff 100%)', borderRadius: 28, padding: '52px 48px', textAlign: 'center', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'rgba(75,127,237,0.06)', borderRadius: '50%', filter: 'blur(30px)' }}></div>
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, background: 'rgba(139,92,246,0.06)', borderRadius: '50%', filter: 'blur(30px)' }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🛠️</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: '0 0 12px', letterSpacing: '-0.5px' }}>Got a Tool Idea?</h2>
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px' }}>
              Tell us what you wish existed. We build the most-requested tools first — your idea could be next.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://reddit.com/r/tabutility" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#FF4500', color: 'white', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 16px rgba(255,69,0,0.25)' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 5.522 4.477 10 10 10s10-4.478 10-10zm-10.768 3.44c-1.552 0-2.818-.814-2.818-1.44h5.636c0 .626-1.266 1.44-2.818 1.44zm-3.904-3.44a1.12 1.12 0 1 1 2.24 0 1.12 1.12 0 0 1-2.24 0zm6.672-1.12a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24zm2.24-1.28c-.448 0-.816.224-1.04.56a5.6 5.6 0 0 0-2.88-.784l.56-2.576 1.776.384a.896.896 0 1 0 .896-.896c-.336 0-.624.192-.784.448l-2-.432a.14.14 0 0 0-.16.1l-.624 2.88a5.6 5.6 0 0 0-2.912.784 1.232 1.232 0 0 0-1.04-.56C5.36 6.608 5 6.976 5 7.44c0 .32.176.592.432.752a2.4 2.4 0 0 0-.032.368c0 1.888 2.208 3.44 4.928 3.44s4.928-1.552 4.928-3.44c0-.128-.016-.256-.032-.368.256-.16.432-.432.432-.752 0-.464-.352-.84-.784-.84z"/></svg>
                Request on r/tabutility
              </a>
            </div>
            <p style={{ margin: '20px 0 0', fontSize: 13, color: '#94a3b8' }}>Join the community · vote on ideas · follow the build journey</p>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        style={{ padding: "0 24px 80px", maxWidth: 900, margin: "0 auto" }}
      >
        <div
          style={{
            background: "#0f172a",
            borderRadius: 28,
            padding: "60px 48px",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 220,
              height: 220,
              background: "rgba(255,255,255,0.04)",
              borderRadius: "50%",
              filter: "blur(40px)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 280,
              height: 280,
              background: "rgba(59,130,246,0.08)",
              borderRadius: "50%",
              filter: "blur(40px)",
            }}
          ></div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-block",
                padding: "4px 14px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.6)",
                marginBottom: 20,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              The Founder Story
            </div>
            <h2
              style={{
                fontSize: 30,
                fontWeight: 800,
                margin: "0 0 24px",
                letterSpacing: "-0.5px",
              }}
            >
              Why Tabutility Exists
            </h2>
            <div
              style={{
                maxWidth: 560,
                margin: "0 auto",
                color: "rgba(255,255,255,0.65)",
                fontSize: 16,
                lineHeight: 1.8,
              }}
            >
              <p style={{ margin: "0 0 16px" }}>
                I started Tabutility because I was frustrated. Most online tools
                are either outdated, bloated, or designed to extract money from
                you. I decided to build something different — tools that are
                genuinely useful, completely free, and honest about how they
                work.
              </p>
              <p style={{ margin: "0 0 36px" }}>
                Building in public means sharing everything: revenue, growth
                metrics, failures, and learnings. No PR spin. Just real.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://reddit.com/r/webdev"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "12px 22px",
                  background: "rgba(255,69,0,0.12)",
                  color: "#FF6534",
                  border: "1px solid rgba(255,69,0,0.2)",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Follow on Reddit
              </a>
              <a
                href="https://indiehackers.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "12px 22px",
                  background: "rgba(84,197,150,0.12)",
                  color: "#54C596",
                  border: "1px solid rgba(84,197,150,0.2)",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Indie Hackers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          background: "white",
          borderTop: "1px solid #f1f5f9",
          padding: "56px 24px 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 40,
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontWeight: 700,
                fontSize: 18,
                color: "#0f172a",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  background: "#0f172a",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  color: "white",
                }}
              >
                ⌘
              </div>
              Tabutility
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#94a3b8",
                lineHeight: 1.65,
              }}
            >
              Free tools built by a solo founder. No tracking. Just tools that
              work.
            </p>
          </div>
          <div>
            <h4
              style={{
                margin: "0 0 16px",
                fontSize: 14,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Legal
            </h4>
            {[
              ["Privacy Policy", "privacy"],
              ["Terms of Service", "terms"],
            ].map(([label, key]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => setModal(key)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    color: "#64748b",
                    textDecoration: "none",
                    fontSize: 13,
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#0f172a")}
                  onMouseLeave={(e) => (e.target.style.color = "#64748b")}
                >
                  {label}
                </button>
              </div>
            ))}
          </div>
          <div>
            <h4
              style={{
                margin: "0 0 16px",
                fontSize: 14,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Community
            </h4>
            {[
              ["Reddit", "https://reddit.com"],
              ["Indie Hackers", "https://indiehackers.com"],
            ].map(([label, href]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#64748b",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#0f172a")}
                  onMouseLeave={(e) => (e.target.style.color = "#64748b")}
                >
                  {label}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            paddingTop: 24,
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            fontSize: 12,
            color: "#94a3b8",
          }}
        >
          <span>© 2026 Tabutility. Built with ❤️ in public.</span>
          <span>Designed for humans, not trackers.</span>
        </div>
      </footer>

      {/* ── Cookie Consent Banner ── */}
      {cookieConsent === null && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 300,
          background: '#0f172a', color: 'white',
          padding: '20px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
          boxShadow: '0 -4px 24px rgba(0,0,0,0.18)',
        }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: 15 }}>We use cookies 🍪</p>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
              We use cookies for analytics and to show relevant ads via Google AdSense.
              Your data is never sold. Utility tools always run 100% in your browser.{' '}
              <button onClick={() => setModal('privacy')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#93c5fd', fontSize: 13, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}>
                Privacy Policy
              </button>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <button onClick={handleCookieDecline}
              style={{ padding: '10px 20px', background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}>
              Decline
            </button>
            <button onClick={handleCookieAccept}
              style={{ padding: '10px 20px', background: '#4B7FED', color: 'white', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
              onMouseEnter={e => e.currentTarget.style.background = '#3b6fd4'}
              onMouseLeave={e => e.currentTarget.style.background = '#4B7FED'}>
              Accept All
            </button>
          </div>
        </div>
      )}

      {/* ── Legal Modals ── */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: 'white', borderRadius: 24, padding: '40px 48px', maxWidth: 640, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.18)', position: 'relative' }}>
            {/* Close button */}
            <button
              onClick={() => setModal(null)}
              style={{ position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderRadius: '50%', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: 18, color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ✕
            </button>

            {modal === 'privacy' && (
              <>
                <h2 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 800, color: '#0f172a' }}>Privacy Policy</h2>
                <p style={{ margin: '0 0 28px', fontSize: 13, color: '#94a3b8' }}>Last updated: July 17, 2026</p>

                <p style={{ margin: '0 0 24px', fontSize: 14, color: '#475569', lineHeight: 1.7 }}>
                  This Privacy Policy describes how Tabutility ("we", "us", or "our") collects, uses, and shares information when you visit <strong>tabutility.com</strong> and its sub-domains. By using our site, you agree to the practices described here.
                </p>

                {[
                  ['1. Information We Collect',
                   'We collect limited, non-personal information automatically when you visit our site. This includes your browser type, device type, the pages you visit, the time and date of your visit, and your general geographic region (country/region level only — never your precise location). We do not collect your name, email address, or any other personally identifiable information unless you voluntarily contact us.'],
                  ['2. How Your Data Stays in Your Browser',
                   'All utility tools on Tabutility (calculators, developer tools, image tools, and wellness tools) run entirely in your browser. Data you enter — text, files, or settings — is processed locally on your device and is never transmitted to our servers. We have no access to it.'],
                  ['3. Cookies',
                   'We use cookies and similar tracking technologies for the following purposes: (a) Site functionality — small cookies to remember your preferences, such as which FAQ items you have expanded. (b) Analytics — we use Google Analytics to understand aggregate usage patterns (e.g. which tools are most popular). Google Analytics collects anonymised data and sets its own cookies. You can opt out at https://tools.google.com/dlpage/gaoptout. (c) Advertising — we display ads through Google AdSense. Google and its partners use cookies to serve ads based on your prior visits to our site and other sites on the internet. You can opt out of personalised advertising by visiting https://www.google.com/settings/ads.'],
                  ['4. Google AdSense & Third-Party Advertising',
                   'We use Google AdSense to display advertisements. Google AdSense uses the DoubleClick cookie to serve ads based on your interests. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website and other websites. The use of advertising cookies enables Google and its partners to serve ads to you based on your visits to our sites and/or other sites on the internet. You may opt out of personalised advertising by visiting Ads Settings (https://www.google.com/settings/ads). Alternatively, you can opt out of a third-party vendor\'s use of cookies for personalised advertising by visiting www.aboutads.info.'],
                  ['5. AI-Powered (Hybrid) Tools',
                   'Our AI-powered tools — AI Email Writer, Content Repurposer, and AI Summarizer — send the text content you submit to a third-party AI provider (such as OpenAI) to generate results. This is clearly disclosed on each tool\'s page before you use it. We do not store the content of these requests on our servers beyond the time needed to return a result to you. Please do not submit sensitive personal information through these tools.'],
                  ['6. Data Sharing',
                   'We do not sell, rent, or trade your personal information to any third party. We share anonymised, aggregate usage data with analytics providers (Google Analytics) and serve advertisements through Google AdSense, both of which operate under their own privacy policies. We may disclose information if required by law.'],
                  ['7. Children\'s Privacy',
                   'Tabutility is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.'],
                  ['8. Your Rights',
                   'Depending on your location, you may have rights under GDPR, CCPA, or other privacy laws to access, correct, or delete your data. Since we collect very little identifiable data, most requests can be satisfied by clearing your browser cookies. For any other requests, contact us through Reddit or Indie Hackers and we will respond within 30 days.'],
                  ['9. Changes to This Policy',
                   'We may update this Privacy Policy from time to time. Any changes will be reflected by updating the "Last updated" date above. Your continued use of the site after changes are posted constitutes your acceptance of the updated policy.'],
                  ['10. Contact',
                   'If you have any questions about this Privacy Policy, please reach out to us via Reddit (r/tabutility) or Indie Hackers. We are a solo-founder project and are happy to answer any questions directly.'],
                ].map(([title, body]) => (
                  <div key={title} style={{ marginBottom: 22 }}>
                    <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{title}</h3>
                    <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.75 }}>{body}</p>
                  </div>
                ))}
              </>
            )}

            {modal === 'terms' && (
              <>
                <h2 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 800, color: '#0f172a' }}>Terms of Service</h2>
                <p style={{ margin: '0 0 28px', fontSize: 13, color: '#94a3b8' }}>Last updated: July 17, 2026</p>

                <p style={{ margin: '0 0 24px', fontSize: 14, color: '#475569', lineHeight: 1.7 }}>
                  These Terms of Service govern your use of <strong>tabutility.com</strong> and all tools and services provided by Tabutility. By accessing or using our site, you agree to be bound by these terms.
                </p>

                {[
                  ['1. Acceptance of Terms',
                   'By accessing or using Tabutility, you confirm that you are at least 13 years old and agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our site.'],
                  ['2. Description of Service',
                   'Tabutility provides free, browser-based utility tools for text processing, developer tasks, image handling, wellness, and productivity. Some tools ("hybrid tools") are AI-powered and offer free tiers with optional paid upgrades. The availability and features of any tool may change at any time without prior notice.'],
                  ['3. Free Tools',
                   'All utility tools (non-AI) are and will remain free to use with no account or sign-up required. They run entirely in your browser — no data you enter is sent to our servers. Hybrid (AI-powered) tools include a free tier; paid tiers, if applicable, are governed by additional terms disclosed at the time of purchase.'],
                  ['4. Acceptable Use',
                   'You agree not to use Tabutility to: (a) generate, distribute, or store illegal, harmful, defamatory, or abusive content; (b) violate any applicable local, national, or international law or regulation; (c) transmit malware, viruses, or any other malicious code; (d) attempt to gain unauthorised access to our systems or another user\'s data; (e) scrape or crawl our site in a way that imposes unreasonable load on our servers; or (f) misrepresent the origin of output generated by our AI tools. We reserve the right to block access to any user who violates these terms.'],
                  ['5. Intellectual Property',
                   'The Tabutility name, logo, site design, and written content are owned by us and protected by applicable intellectual property laws. The output you generate using our tools belongs to you. You grant us no rights over content you enter into our tools.'],
                  ['6. Third-Party Services',
                   'Our site uses third-party services including Google AdSense (advertising) and Google Analytics (analytics). AI-powered tools use third-party AI providers. These services are governed by their own terms and privacy policies. We are not responsible for the practices of third-party services.'],
                  ['7. Disclaimer of Warranties',
                   'Tabutility is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the tools will be error-free, uninterrupted, or produce accurate results for every use case. You use the tools at your own risk. Nothing on this site constitutes professional legal, financial, medical, or other advice.'],
                  ['8. Limitation of Liability',
                   'To the fullest extent permitted by law, Tabutility and its owner shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the site or tools, even if we have been advised of the possibility of such damages. Our total liability to you for any claim shall not exceed €100.'],
                  ['9. Changes to Terms',
                   'We may update these Terms of Service at any time. Changes will be effective when posted, indicated by the updated "Last updated" date above. Your continued use of the site after changes are posted constitutes acceptance of the revised terms.'],
                  ['10. Governing Law',
                   'These terms are governed by the laws of the jurisdiction in which the owner of Tabutility resides. Any disputes shall be resolved in the courts of that jurisdiction.'],
                  ['11. Contact',
                   'For questions about these Terms of Service, reach us via Reddit or Indie Hackers. We aim to respond to all enquiries within 7 business days.'],
                ].map(([title, body]) => (
                  <div key={title} style={{ marginBottom: 22 }}>
                    <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{title}</h3>
                    <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.75 }}>{body}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
