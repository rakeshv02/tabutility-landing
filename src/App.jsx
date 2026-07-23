import { useState, useMemo } from "react";
import toolsData from "./tools.config.json";

const CATEGORIES = ["All", "Calculators", "Developer Tools", "Content Tools", "International", "Converters", "Image Tools", "Wellness", "Fun Tools", "Productivity"];

const CATEGORY_COLORS = {
  "Calculators":     { badge: "#4f46e5", light: "#eef2ff", text: "#3730a3" },
  "Developer Tools": { badge: "#16a34a", light: "#f0fdf4", text: "#15803d" },
  "Content Tools":   { badge: "#ea580c", light: "#fff7ed", text: "#c2410c" },
  "International":   { badge: "#7c3aed", light: "#faf5ff", text: "#6d28d9" },
  "Converters":      { badge: "#0284c7", light: "#f0f9ff", text: "#0369a1" },
  "Image Tools":     { badge: "#e11d48", light: "#fff1f2", text: "#be123c" },
  "Wellness":        { badge: "#0d9488", light: "#f0fdfa", text: "#0f766e" },
  "Fun Tools":       { badge: "#f97316", light: "#fff7ed", text: "#c2410c" },
  "Productivity":    { badge: "#0ea5e9", light: "#f0f9ff", text: "#0369a1" },
};

const DEFAULT_COLOR = { badge: "#374151", light: "#f9fafb", text: "#111827" };

export default function App() {
  const [search, setSearch]               = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const isFiltered = search.trim() !== "" || activeCategory !== "All";

  const filtered = useMemo(() => {
    return toolsData.filter(tool => {
      const matchCat = activeCategory === "All" || tool.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        (tool.tags || []).some(t => t.includes(q));
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    if (isFiltered) return null;
    return CATEGORIES.slice(1).reduce((acc, cat) => {
      const tools = toolsData.filter(t => t.category === cat);
      if (tools.length) acc[cat] = tools;
      return acc;
    }, {});
  }, [isFiltered]);

  const totalTools = toolsData.length;

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: "#f1f5f9", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)", color: "#fff", padding: "44px 20px 36px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
        <h1 style={{ margin: "0 0 10px", fontSize: "clamp(26px, 5vw, 44px)", fontWeight: 900, letterSpacing: -1 }}>
          Tabutility
        </h1>
        <p style={{ margin: "0 0 24px", fontSize: 16, color: "#a5b4fc", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          {totalTools} free browser tools. No sign-up. No downloads. Just instant results.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 500, margin: "0 auto", position: "relative" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, pointerEvents: "none" }}>🔍</span>
          <input
            type="text"
            placeholder={`Search ${totalTools} tools…`}
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveCategory("All"); }}
            style={{ width: "100%", padding: "13px 14px 13px 42px", borderRadius: 12, border: "2px solid rgba(165,180,252,0.25)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box" }}
          />
          {search && (
            <button onClick={() => setSearch("")}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#a5b4fc", fontSize: 18, cursor: "pointer", padding: 0, lineHeight: 1 }}>✕</button>
          )}
        </div>
      </div>

      {/* ── Sticky Filter Bar ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#1e293b", borderBottom: "1px solid #334155", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 20px", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "nowrap", minWidth: "max-content" }}>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              const colors = CATEGORY_COLORS[cat] || DEFAULT_COLOR;
              const count = cat === "All" ? totalTools : toolsData.filter(t => t.category === cat).length;
              return (
                <button key={cat}
                  onClick={() => { setActiveCategory(cat); setSearch(""); }}
                  style={{
                    padding: "7px 14px", borderRadius: 20, border: "none", whiteSpace: "nowrap",
                    background: isActive ? colors.badge : "#334155",
                    color: isActive ? "#fff" : "#94a3b8",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .15s",
                    display: "flex", alignItems: "center", gap: 5
                  }}>
                  {cat}
                  <span style={{ fontSize: 11, opacity: 0.8, background: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)", borderRadius: 10, padding: "1px 6px" }}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Featured Banner ── */}
      {!isFiltered && (
        <div style={{ maxWidth: 1200, margin: "24px auto 0", padding: "0 20px" }}>
          <a href="https://loan-calculator.tabutility.com" style={{ textDecoration: "none" }}>
            <div style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", borderRadius: 14, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, boxShadow: "0 4px 20px rgba(79,70,229,0.25)" }}>
              <div>
                <div style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>⭐ Featured</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 2 }}>🏦 Loan Calculator Hub</div>
                <div style={{ fontSize: 13, color: "#ddd6fe" }}>Monthly payments · Amortization · Rate comparison · Extra payment simulator</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "8px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>Try free →</div>
            </div>
          </a>
        </div>
      )}

      {/* ── Tool Grid ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 20px 60px" }}>

        {/* Search / filter result header */}
        {isFiltered && (
          <div style={{ marginBottom: 16, fontSize: 14, color: "#64748b" }}>
            {filtered.length === 0
              ? `No tools found for "${search}"`
              : `${filtered.length} tool${filtered.length !== 1 ? "s" : ""}${search ? ` matching "${search}"` : ""}${activeCategory !== "All" ? ` in ${activeCategory}` : ""}`}
          </div>
        )}

        {/* Flat grid (search / category filter) */}
        {isFiltered && filtered.length > 0 && <ToolGrid tools={filtered} />}

        {/* No results */}
        {isFiltered && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Nothing found</div>
            <div style={{ fontSize: 14, marginTop: 6 }}>Try a different search or browse a category above</div>
          </div>
        )}

        {/* Grouped view (All, no search) */}
        {!isFiltered && grouped && Object.entries(grouped).map(([category, tools]) => (
          <div key={category} style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#1e293b" }}>{category}</h2>
              <span style={{ background: (CATEGORY_COLORS[category] || DEFAULT_COLOR).badge, color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{tools.length}</span>
            </div>
            <ToolGrid tools={tools} />
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div style={{ background: "#1a1a2e", color: "#94a3b8", textAlign: "center", padding: "28px 20px", fontSize: 13 }}>
        <div style={{ fontSize: 18, marginBottom: 6 }}>⚡ Tabutility</div>
        <div style={{ marginBottom: 6 }}>{totalTools} free browser-based utility tools. No sign-up required.</div>
        <div style={{ color: "#4b5563", fontSize: 12 }}>© {new Date().getFullYear()} Tabutility · All tools run in your browser · Your data never leaves your device</div>
      </div>

    </div>
  );
}

function ToolGrid({ tools }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: 10 }}>
      {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
    </div>
  );
}

function ToolCard({ tool }) {
  const colors = CATEGORY_COLORS[tool.category] || DEFAULT_COLOR;
  const [hovered, setHovered] = useState(false);
  return (
    <a href={tool.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? colors.light : "#fff",
          borderRadius: 10,
          padding: "11px 13px 10px",
          border: `1.5px solid ${hovered ? colors.badge : "#e2e8f0"}`,
          cursor: "pointer",
          transition: "all 0.15s",
          transform: hovered ? "translateY(-2px)" : "none",
          boxShadow: hovered ? `0 5px 16px rgba(0,0,0,0.08)` : "0 1px 3px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxSizing: "border-box",
        }}>

        {/* Icon + name row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{tool.emoji}</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b", lineHeight: 1.25, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{tool.name}</span>
        </div>

        {/* Category badge */}
        <span style={{ fontSize: 10, background: colors.light, color: colors.text, border: `1px solid ${colors.badge}33`, borderRadius: 4, padding: "1px 5px", fontWeight: 600, display: "inline-block", alignSelf: "flex-start", marginBottom: 6 }}>{tool.category}</span>

        {/* Description — 2 lines max */}
        <p style={{ margin: "0 0 8px", fontSize: 11, color: "#64748b", lineHeight: 1.45, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{tool.description}</p>

        {/* Open link */}
        <div style={{ fontSize: 11, color: colors.badge, fontWeight: 700 }}>Open →</div>
      </div>
    </a>
  );
}
