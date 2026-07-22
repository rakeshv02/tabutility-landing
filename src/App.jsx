import { useState, useMemo } from "react";
import toolsData from "./tools.config.json";

const CATEGORIES = ["All", "Calculators", "Developer Tools", "Content Tools", "International", "Converters", "Image Tools", "Wellness"];

const CATEGORY_COLORS = {
  "Calculators":     { bg: "#eef2ff", border: "#c7d2fe", badge: "#4f46e5", text: "#3730a3" },
  "Developer Tools": { bg: "#f0fdf4", border: "#bbf7d0", badge: "#16a34a", text: "#15803d" },
  "Content Tools":   { bg: "#fff7ed", border: "#fed7aa", badge: "#ea580c", text: "#c2410c" },
  "International":   { bg: "#faf5ff", border: "#e9d5ff", badge: "#7c3aed", text: "#6d28d9" },
  "Converters":      { bg: "#f0f9ff", border: "#bae6fd", badge: "#0284c7", text: "#0369a1" },
  "Image Tools":     { bg: "#fff1f2", border: "#fecdd3", badge: "#e11d48", text: "#be123c" },
  "Wellness":        { bg: "#f0fdfa", border: "#99f6e4", badge: "#0d9488", text: "#0f766e" },
};

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return toolsData.filter(tool => {
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch = !q || tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q) || (tool.tags || []).some(t => t.includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    if (activeCategory !== "All") return { [activeCategory]: filtered };
    return CATEGORIES.slice(1).reduce((acc, cat) => {
      const tools = filtered.filter(t => t.category === cat);
      if (tools.length) acc[cat] = tools;
      return acc;
    }, {});
  }, [filtered, activeCategory]);

  const totalTools = toolsData.length;

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: "#f8faff", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)", color: "#fff", padding: "60px 20px 50px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⚡</div>
        <h1 style={{ margin: "0 0 12px", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: -1 }}>
          Tabutility
        </h1>
        <p style={{ margin: "0 0 8px", fontSize: 18, color: "#a5b4fc", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          {totalTools} free browser-based tools. No sign-up. No downloads. Just instant results.
        </p>
        <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>Works on any device · 100% free · Updated regularly</p>

        {/* Search */}
        <div style={{ maxWidth: 520, margin: "32px auto 0", position: "relative" }}>
          <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
          <input
            type="text"
            placeholder="Search tools…"
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveCategory("All"); }}
            style={{ width: "100%", padding: "14px 16px 14px 46px", borderRadius: 14, border: "2px solid rgba(165,180,252,0.3)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 16, outline: "none", boxSizing: "border-box", backdropFilter: "blur(8px)" }}
          />
        </div>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
          {[
            { value: totalTools, label: "Free Tools" },
            { value: "0", label: "Sign-ups needed" },
            { value: "7", label: "Categories" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#a5b4fc" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Loan Hub Featured Banner ── */}
      <div style={{ maxWidth: 1100, margin: "32px auto 0", padding: "0 20px" }}>
        <a href="https://loan-calculator.tabutility.com" style={{ textDecoration: "none" }}>
          <div style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", borderRadius: 16, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, cursor: "pointer", transition: "transform 0.2s", boxShadow: "0 8px 32px rgba(79,70,229,0.3)" }}>
            <div>
              <div style={{ fontSize: 12, color: "#c4b5fd", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>⭐ Featured Tool</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>🏦 Loan Calculator Hub</div>
              <div style={{ fontSize: 14, color: "#ddd6fe" }}>Monthly payments · Amortization schedule · Rate comparison · Extra payment simulator</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 15, whiteSpace: "nowrap" }}>
              Try it free →
            </div>
          </div>
        </a>
      </div>

      {/* ── Category Filter ── */}
      <div style={{ maxWidth: 1100, margin: "28px auto 0", padding: "0 20px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            const colors = CATEGORY_COLORS[cat];
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ padding: "8px 18px", borderRadius: 24, border: `2px solid ${isActive ? (colors?.badge || "#4f46e5") : "#e5e7eb"}`, background: isActive ? (colors?.badge || "#4f46e5") : "#fff", color: isActive ? "#fff" : "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>
                {cat}
                <span style={{ marginLeft: 6, fontSize: 12, opacity: 0.8 }}>
                  {cat === "All" ? toolsData.length : toolsData.filter(t => t.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tool Grid ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 60px" }}>
        {Object.keys(grouped).length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>No tools found for "{search}"</div>
            <div style={{ fontSize: 14, marginTop: 6 }}>Try a different search term</div>
          </div>
        ) : (
          Object.entries(grouped).map(([category, tools]) => {
            const colors = CATEGORY_COLORS[category] || { bg: "#f9fafb", border: "#e5e7eb", badge: "#374151", text: "#111827" };
            return (
              <div key={category} style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1a1a2e" }}>{category}</h2>
                  <span style={{ background: colors.badge, color: "#fff", fontSize: 12, fontWeight: 700, padding: "2px 10px", borderRadius: 20 }}>{tools.length}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                  {tools.map(tool => (
                    <a key={tool.id} href={tool.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div style={{ background: "#fff", borderRadius: 14, padding: "20px 20px 18px", border: `1.5px solid ${colors.border}`, cursor: "pointer", transition: "all 0.15s", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${colors.border}`; e.currentTarget.style.background = colors.bg; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "#fff"; }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                          <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{tool.emoji}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3, marginBottom: 2 }}>{tool.name}</div>
                            <span style={{ fontSize: 11, background: colors.bg, color: colors.text, border: `1px solid ${colors.border}`, borderRadius: 6, padding: "1px 7px", fontWeight: 600 }}>{tool.category}</span>
                          </div>
                        </div>
                        <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6b7280", lineHeight: 1.5, flex: 1 }}>{tool.description}</p>
                        <div style={{ fontSize: 13, color: colors.text, fontWeight: 600 }}>Open tool →</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{ background: "#1a1a2e", color: "#9ca3af", textAlign: "center", padding: "32px 20px", fontSize: 13 }}>
        <div style={{ fontSize: 20, marginBottom: 8 }}>⚡ Tabutility</div>
        <div style={{ marginBottom: 8 }}>{totalTools} free browser-based utility tools. No sign-up required.</div>
        <div style={{ color: "#6b7280", fontSize: 12 }}>© {new Date().getFullYear()} Tabutility · All tools run in your browser · Your data never leaves your device</div>
      </div>

    </div>
  );
}
