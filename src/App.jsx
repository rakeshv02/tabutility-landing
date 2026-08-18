import { useEffect, useMemo, useState } from "react";
import toolsData from "./tools.config.json";

const CATEGORIES = ["All", "Calculators", "Developer Tools", "Content Tools", "SEO", "International", "Converters", "Image Tools", "Wellness", "Fun Tools", "Productivity"];
const CATEGORY_COLORS = {
  Calculators: { badge: "#4f46e5", light: "#eef2ff", text: "#3730a3" },
  "Developer Tools": { badge: "#16a34a", light: "#f0fdf4", text: "#15803d" },
  "Content Tools": { badge: "#ea580c", light: "#fff7ed", text: "#c2410c" },
  International: { badge: "#7c3aed", light: "#faf5ff", text: "#6d28d9" },
  Converters: { badge: "#0284c7", light: "#f0f9ff", text: "#0369a1" },
  "Image Tools": { badge: "#e11d48", light: "#fff1f2", text: "#be123c" },
  Wellness: { badge: "#0d9488", light: "#f0fdfa", text: "#0f766e" },
  "Fun Tools": { badge: "#f97316", light: "#fff7ed", text: "#c2410c" },
  SEO: { badge: "#059669", light: "#ecfdf5", text: "#065f46" },
  Productivity: { badge: "#0ea5e9", light: "#f0f9ff", text: "#0369a1" },
  toggleButton: { background: "transparent", border: 0, color: "#c7d2fe", borderRadius: 6, padding: "8px 12px", fontWeight: 700, cursor: "pointer" },
  statBlock: { display: "flex", flexDirection: "column", gap: 7, minWidth: 0 },
};
const DEFAULT_COLOR = { badge: "#374151", light: "#f9fafb", text: "#111827" };
const BLOG_POSTS = [
  { title: "I Refused to Pay $130/Month for Semrush — So I Built 7 Free SEO Tools", desc: "The origin story of Tabutility: how one frustrating Tuesday afternoon turned into 153 free tools.", url: "/blog/product-hunt-launch/", categories: ["SEO", "All"] },
  { title: "How Compound Interest Works", desc: "How modest savings snowball into real wealth — and why starting early beats saving more.", url: "/blog/how-compound-interest-works/", categories: ["Calculators"] },
  { title: "What Is a Good Rental Yield?", desc: "The UK landlord benchmark, city-by-city breakdown, and how to improve your returns.", url: "/blog/what-is-good-rental-yield-uk/", categories: ["Calculators", "International"] },
  { title: "How to Pay Off Debt Fast", desc: "Snowball vs avalanche — which method saves more money and which one you'll stick to.", url: "/blog/how-to-pay-off-debt-fast/", categories: ["Calculators"] },
  { title: "IR35 Explained", desc: "What every UK contractor needs to know about off-payroll working rules in plain English.", url: "/blog/ir35-explained-uk-contractors/", categories: ["International", "Calculators"] },
  { title: "How Much to Retire in the UK?", desc: "The PLSA standards, the 4% rule, and how to calculate your own retirement target.", url: "/blog/how-much-to-retire-uk/", categories: ["Calculators", "International"] },
  { title: "Take-Home Pay Compared: UK vs USA vs Australia vs Canada", desc: "We ran the same salary through four tax systems. Here's exactly how much you keep in each country.", url: "/blog/take-home-pay-compared/", categories: ["Calculators", "International", "All"] },
  { title: "APR Explained", desc: "The one number that actually matters when comparing loans, cards and mortgages.", url: "/blog/apr-explained/", categories: ["Calculators", "Converters"] },
];
const HOVER_STYLES = `.tool-card{transition:border-color .15s,background .15s,transform .15s,box-shadow .15s}.tool-card:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.1)!important}.hero-pop-link{transition:background .15s,border-color .15s}.hero-pop-link:hover{background:#eef2ff!important;border-color:#818cf8!important}@media(max-width:800px){.hero-split{flex-direction:column!important}.hero-card-wrap{display:none!important}.hero-title-size{font-size:clamp(36px,8vw,52px)!important}}`;
function trackRecentTool(tool) {
  try {
    const stored = JSON.parse(localStorage.getItem("tab_recent") || "[]");
    localStorage.setItem("tab_recent", JSON.stringify([{ id: tool.id, name: tool.name, emoji: tool.emoji, url: tool.url }, ...stored.filter(t => t.id !== tool.id)].slice(0, 8)));
    window.dispatchEvent(new CustomEvent("tab_recent_updated"));
  } catch {}
}

const CALC = {
  ca: gross => {
    // Federal 2025 (blended 14.5% first bracket) + Ontario, with BPA/CEA/CPP/EI credits
    const fb = [[57375, .145], [114750, .205], [177882, .26], [253414, .29], [Infinity, .33]];
    const ob = [[52886, .0505], [105775, .0915], [150000, .1116], [220000, .1216], [Infinity, .1316]];
    const bt = (inc, b) => { let t = 0, p = 0; for (const [top, r] of b) { if (inc <= p) break; t += (Math.min(inc, top) - p) * r; p = top; } return t; };
    const cpp = Math.max(0, Math.min(gross, 71300) - 3500) * .0595 + Math.max(0, Math.min(gross, 81200) - 71300) * .04;
    const ei = Math.min(gross, 65700) * .0164;
    const fbpa = gross <= 177882 ? 16129 : gross >= 253414 ? 14538 : 16129 - (16129 - 14538) * (gross - 177882) / (253414 - 177882);
    const fed = Math.max(0, bt(gross, fb) - (fbpa + Math.min(1471, gross) + cpp + ei) * .145);
    let on = Math.max(0, bt(gross, ob) - (12747 + cpp + ei) * .0505);
    let sur = 0; if (on > 5710) sur += (on - 5710) * .2; if (on > 7307) sur += (on - 7307) * .36; on += sur;
    on += gross <= 20000 ? 0 : gross <= 36000 ? Math.min((gross - 20000) * .06, 300) : gross <= 48000 ? 300 + Math.min((gross - 36000) * .06, 150) : gross <= 72000 ? 450 + Math.min((gross - 48000) * .25, 150) : gross <= 200000 ? 600 + Math.min((gross - 72000) * .25, 150) : 750 + Math.min((gross - 200000) * .25, 150);
    return gross - fed - on - cpp - ei;
  },
  uk: gross => {
    const pa = 12570, br = 50270, hr = 125140;
    let ePA = gross > 100000 ? Math.max(0, pa - (gross - 100000) / 2) : pa, t = Math.max(0, gross - ePA);
    const tax = Math.min(t, br - pa) * .2 + Math.min(Math.max(t - (br - pa), 0), hr - br) * .4 + Math.max(t - (hr - pa), 0) * .45;
    const ni = gross > 12570 ? (Math.min(gross, 50270) - 12570) * .08 + Math.max(gross - 50270, 0) * .02 : 0;
    return gross - tax - ni;
  },
  us: gross => {
    const brackets = [[0, 12400, .1], [12400, 50400, .12], [50400, 105700, .22], [105700, 201775, .24], [201775, 256225, .32], [256225, 640600, .35], [640600, Infinity, .37]];
    const taxable = Math.max(0, gross - 16100);
    let fed = 0;
    brackets.forEach(([lo, hi, rate]) => { if (taxable > lo) fed += (Math.min(taxable, hi) - lo) * rate; });
    return gross - fed - Math.min(gross, 184500) * .062 - gross * .0145 - Math.max(0, gross - 200000) * .009;
  },
  au: gross => {
    const brackets = [[0, 18200, 0], [18200, 45000, .16], [45000, 135000, .3], [135000, 190000, .37], [190000, Infinity, .45]];
    let tax = 0;
    brackets.forEach(([lo, hi, rate]) => { if (gross > lo) tax += (Math.min(gross, hi) - lo) * rate; });
    const lito = gross <= 37500 ? 700 : gross <= 45000 ? 700 - (gross - 37500) * .05 : gross <= 66667 ? 325 - (gross - 45000) * .015 : 0;
    const medicare = gross <= 26000 ? 0 : gross <= 32500 ? (gross - 26000) * .1 : gross * .02;
    return gross - Math.max(0, tax - lito) - medicare;
  },
  jp: gross => {
    function empDed(g) { if (g <= 1900000) return 650000; if (g <= 3600000) return g * 0.30 + 80000; if (g <= 6600000) return g * 0.20 + 440000; if (g <= 8500000) return g * 0.10 + 1100000; return 1950000; }
    function basicDed(net, type) { if (type === "national") { if (net <= 23500000) return 580000; if (net <= 24000000) return 480000; if (net <= 24500000) return 320000; if (net <= 25000000) return 160000; return 0; } if (net <= 24000000) return 430000; if (net <= 24500000) return 290000; if (net <= 25000000) return 150000; return 0; }
    function natTax(t) { if (t <= 0) return 0; if (t <= 1950000) return t * 0.05; if (t <= 3300000) return t * 0.10 - 97500; if (t <= 6950000) return t * 0.20 - 427500; if (t <= 9000000) return t * 0.23 - 636000; if (t <= 18000000) return t * 0.33 - 1536000; if (t <= 40000000) return t * 0.40 - 2796000; return t * 0.45 - 4796000; }
    const health = Math.min(gross, 16680000) * 0.0499, pension = Math.min(gross, 7800000) * 0.0915, emp = gross * 0.0055, social = health + pension + emp;
    const netIncome = gross - empDed(gross);
    const taxableNat = Math.floor(Math.max(0, netIncome - social - basicDed(netIncome, "national")) / 1000) * 1000;
    const incomeTax = Math.max(0, natTax(taxableNat)), surtax = incomeTax * 0.021;
    const taxableRes = Math.max(0, netIncome - social - basicDed(netIncome, "resident"));
    const resident = taxableRes > 0 ? taxableRes * 0.10 + 5000 : 0;
    return gross - incomeTax - surtax - resident - social;
  },
};
const COUNTRIES = {
  uk: { flag: "🇬🇧", label: "UK", sym: "£", min: 20000, max: 200000, year: "2025/26", slug: "uk-salary", hub: "https://uk-salary-calculator.tabutility.com" },
  us: { flag: "🇺🇸", label: "US", sym: "$", min: 30000, max: 300000, year: "2026", slug: "us-salary", hub: "https://us-paycheck-calculator.tabutility.com" },
  au: { flag: "🇦🇺", label: "AU", sym: "A$", min: 40000, max: 250000, year: "2025–26", slug: "au-salary", hub: "https://australian-tax-calculator.tabutility.com" },
  ca: { flag: "🇨🇦", label: "CA", sym: "C$", min: 30000, max: 250000, year: "2025", slug: null, hub: "https://canada-income-tax.tabutility.com" },
  jp: { flag: "🇯🇵", label: "JP", sym: "¥", min: 3000000, max: 20000000, year: "2026", slug: null, hub: "https://japan-income-tax.tabutility.com" },
};
function money(c, n) { return `${c.sym}${Math.round(n).toLocaleString("en-US")}`; }

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [country, setCountry] = useState(() => { try { return localStorage.getItem("tab_country") || "all"; } catch { return "all"; } });
  const [recentTools, setRecentTools] = useState(() => { try { return JSON.parse(localStorage.getItem("tab_recent") || "[]"); } catch { return []; } });
  const isFiltered = search.trim() !== "" || activeCategory !== "All";
  const filtered = useMemo(() => toolsData.filter(t => (activeCategory === "All" || t.category === activeCategory) && (!search.trim() || `${t.name} ${t.description} ${(t.tags || []).join(" ")}`.toLowerCase().includes(search.toLowerCase()))), [search, activeCategory]);
  useEffect(() => { document.title = search.trim() ? `"${search}" — Tabutility` : activeCategory !== "All" ? `${activeCategory} — ${toolsData.filter(t => t.category === activeCategory).length} Free Tools | Tabutility` : `Tabutility — ${toolsData.length} Free Online Utility Tools | No Sign-up`; }, [search, activeCategory]);
  useEffect(() => { const sync = () => { try { setRecentTools(JSON.parse(localStorage.getItem("tab_recent") || "[]")); } catch {} }; window.addEventListener("tab_recent_updated", sync); window.addEventListener("focus", sync); return () => { window.removeEventListener("tab_recent_updated", sync); window.removeEventListener("focus", sync); }; }, []);
  const setNation = id => { setCountry(id); try { localStorage.setItem("tab_country", id); } catch {} };
  const c = COUNTRIES[country] || COUNTRIES.uk;
  return <div style={styles.page}><style>{HOVER_STYLES}</style>
    <ExtensionBanner />
    {/* ── Top nav ── */}
    <nav style={styles.topNav}>
      <div style={styles.brand}>⚡ Tabutility</div>
      <div style={styles.topNavLinks}>
        {[["Money","#take-home"],["Tax","https://uk-salary-calculator.tabutility.com"],["Everyday","https://loan-calculator.tabutility.com"],["Developer","#developer-tools"],["Guides","/blog/"]].map(([l,h])=><a key={l} href={h} style={styles.topNavLink}>{l}</a>)}
      </div>
      <div style={styles.topNavRight}>
        <button style={styles.searchNavBtn} onClick={()=>{ document.querySelector('input[aria-label="Search tools"]')?.focus(); }}>
          <span style={{fontSize:15,color:"#94a3b8"}}>⌕</span> Search {toolsData.length} tools <kbd style={styles.kbd}>⌘K</kbd>
        </button>
      </div>
    </nav>
    {/* ── Hero split ── */}
    <div style={styles.hero}>
      <div className="hero-split" style={styles.heroSplit}>
        {/* Left */}
        <div style={styles.heroLeft}>
          <div style={styles.heroKicker}>
            <span style={styles.heroDot} />
            {toolsData.length} free tools · No sign-up
          </div>
          <h1 className="hero-title-size" style={styles.heroTitle}>
            Get the number.<br /><em style={{color:"#4f46e5",fontStyle:"normal"}}>Move on.</em>
          </h1>
          <p style={styles.heroSub}>Salary after tax, mortgage costs, SEO tools, dev utilities and more — free browser tools that give you the answer and get out of the way.</p>
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}>⌕</span>
            <input aria-label="Search tools" placeholder={`What do you want to work out?`} value={search} onChange={e=>{ setSearch(e.target.value); setActiveCategory("All"); }} style={styles.search} />
            {search && <button onClick={()=>setSearch("")} style={styles.clear}>×</button>}
          </div>
          <div style={styles.trustRow}>
            {[["🖥️","Runs in your browser"],["🔓","No account needed"],["$0","Always free"]].map(([ic,t])=><div key={t} style={styles.trustItem}><span>{ic}</span>{t}</div>)}
          </div>
        </div>
        {/* Right — live calculator card */}
        <div className="hero-card-wrap" style={styles.heroRight}>
          <HeroCard country={country === "all" ? "uk" : country} onCountryChange={setNation} />
        </div>
      </div>
    </div>
    {/* ── Popular bar ── */}
    <div style={styles.popularBar}>
      <span style={styles.popLabel}>POPULAR:</span>
      {[["Salary calculator","https://uk-salary-calculator.tabutility.com"],["Income tax","https://uk-salary-calculator.tabutility.com"],["Mortgage calculator","https://loan-calculator.tabutility.com"],["VAT calculator","https://vat-calculator.tabutility.com"],["Compound interest","https://compound-interest-calculator.tabutility.com"],["Percentage calculator","https://percentage-calculator.tabutility.com"]].map(([l,h])=><a key={l} href={h} className="hero-pop-link" style={styles.popLink}>{l}</a>)}
    </div>
    <div style={styles.countryBar}><div style={styles.countryInner}><span style={styles.countryLabel}>I’m looking at</span>{[["uk", "🇬🇧 UK"], ["us", "🇺🇸 US"], ["au", "🇦🇺 AU"], ["ca", "🇨🇦 CA"], ["jp", "🇯🇵 JP"], ["all", "🌍 All"]].map(([id, label]) => <button key={id} onClick={() => setNation(id)} style={{ ...styles.countryButton, ...(country === id ? styles.countryActive : {}) }}>{label}</button>)}</div></div>
    {recentTools.length > 0 && <div style={styles.recent}><span>RECENT</span>{recentTools.slice(0, 6).map(t => <a key={t.id} href={t.url} onClick={() => trackRecentTool(t)}>{t.emoji} {t.name}</a>)}<button onClick={() => { localStorage.removeItem("tab_recent"); setRecentTools([]); }}>× clear</button></div>}
    <div style={styles.filter}><div style={styles.filterInner}>{CATEGORIES.map(cat => { const active = activeCategory === cat; const color = CATEGORY_COLORS[cat] || DEFAULT_COLOR; return <button key={cat} onClick={() => { setActiveCategory(cat); setSearch(""); }} style={{ ...styles.pill, background: active ? color.badge : "#334155", color: active ? "#fff" : "#94a3b8" }}>{cat} <small>{cat === "All" ? toolsData.length : toolsData.filter(t => t.category === cat).length}</small></button> })}<a href="/blog/" style={styles.blogLink}>▣ Blog</a></div></div>
    {isFiltered ? <main style={styles.content}><div style={styles.result}>{filtered.length ? `${filtered.length} tools${search ? ` matching “${search}”` : ""}` : `No tools found for “${search}”`}</div>{filtered.length ? <ToolGrid tools={filtered} /> : <div style={styles.empty}>⌕<strong>Nothing found</strong><span>Try a different search or browse a category above.</span></div>}</main> : <HomeContent country={country} c={c} />}
    <BlogSection activeCategory={activeCategory} /><footer style={styles.footer}><div style={{ fontSize: 18, color: "#fff" }}>⚡ Tabutility</div><div>{toolsData.length} free browser-based utility tools. No sign-up required.</div><a href="/blog/" style={{color:"#818cf8",textDecoration:"none"}}>Blog</a><span style={{color:"#334155"}}> · </span><a href="/about/" style={{color:"#94a3b8",textDecoration:"none"}}>About</a><span style={{color:"#334155"}}> · </span><a href="/privacy-policy/" style={{color:"#94a3b8",textDecoration:"none"}}>Privacy</a><span style={{color:"#334155"}}> · </span><a href="/contact/" style={{color:"#94a3b8",textDecoration:"none"}}>Contact</a><a href="https://ko-fi.com/tabutility" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,background:"#ff5e5b",color:"#fff",borderRadius:8,padding:"7px 16px",fontWeight:700,textDecoration:"none",fontSize:13,marginTop:6}}>☕ Buy me a coffee</a><small style={{marginTop:6,display:"block"}}>© {new Date().getFullYear()} Tabutility · All tools run in your browser</small></footer>
  </div>;
}

const HERO_DEFAULTS = { jp: 5000000, us: 85000, au: 90000, ca: 75000, uk: 52000 };
function HeroCard({ country, onCountryChange }) {
  const c = COUNTRIES[country]; const [salary, setSalary] = useState(HERO_DEFAULTS[country] ?? 52000);
  useEffect(() => { setSalary(HERO_DEFAULTS[country] ?? 52000); }, [country]);
  const net = CALC[country](salary); const step = country === "jp" ? 100000 : 1000;
  return <div style={styles.heroCard}>
    <div style={styles.heroCardLabel}>SALARY CALCULATOR <span style={styles.liveBadge}>LIVE</span></div>
    <div style={styles.heroCardTitle}>What lands in your account?</div>
    <div style={styles.heroCardToggle}>{Object.entries(COUNTRIES).map(([id,ct])=><button key={id} onClick={()=>onCountryChange(id)} style={{...styles.heroCardToggleBtn,...(country===id?styles.heroCardToggleActive:{})}}>{ct.flag} {ct.label}</button>)}</div>
    <div style={styles.heroCardSalRow}><span style={{fontSize:13,color:"#64748b"}}>Gross yearly salary</span><strong style={{fontSize:22,fontWeight:900,color:"#0f172a"}}>{money(c,salary)}</strong></div>
    <input type="range" min={c.min} max={c.max} step={step} value={Math.min(c.max,Math.max(c.min,salary))} onChange={e=>setSalary(Number(e.target.value))} style={{width:"100%",accentColor:"#4f46e5",margin:"10px 0 3px",cursor:"pointer"}} />
    <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#94a3b8",marginBottom:16}}><span>{money(c,c.min)}</span><span>{money(c,c.max)}</span></div>
    <div style={styles.heroNetRow}>
      <div style={styles.heroNetBlock}><small>TAKE-HOME / YEAR</small><strong>{money(c,net)}</strong></div>
      <div style={styles.heroNetBlock}><small>PER MONTH</small><strong>{money(c,net/12)}</strong></div>
      <div style={{...styles.heroNetBlock,textAlign:"right"}}><small>TAX RATE</small><strong style={{color:"#4f46e5"}}>{((salary-net)/salary*100).toFixed(1)}%</strong></div>
    </div>
    <a href={c.hub} style={styles.heroCardCta}>Open full calculator ↗</a>
  </div>;
}

function HomeContent({ country, c }) {
  const widgetCountry = country === "all" ? "uk" : country;
  const salary = country === "jp" ? 5000000 : country === "us" ? 85000 : country === "au" ? 90000 : 50000;
  return <main><TakeHome country={widgetCountry} c={COUNTRIES[widgetCountry]} salary={salary} /><section style={styles.content}><div style={styles.sectionKicker}>THE MONEY DESK</div><h2 style={styles.sectionTitle}>Money & Tax</h2><div style={styles.featureGrid}>{[
    ["◎", "Global Take-Home Pay Report 2026", "A clear view of what salaries are worth after tax around the world.", "/global-take-home-pay-report-2026/"],
    ["◈", "Take-Home Pay by Country", "Compare the same salary across borders, with the assumptions visible.", "/take-home-pay-by-country/"],
    ["£$", "Salary guides that answer the next question", "Browse country-by-country take-home pay and raise comparisons.", country === "all" || country === "jp" ? "/uk-salary/" : `/${country}-salary/`],
  ].map(([icon, title, desc, href]) => <a href={href} key={title} style={styles.feature}><span style={styles.featureIcon}>{icon}</span><div><h3>{title}</h3><p>{desc}</p><b>Explore →</b></div></a>)}</div><a href="https://loan-calculator.tabutility.com" style={styles.loan}><span><i>FEATURED</i><strong>Loan Calculator Hub</strong><small>Monthly payments · amortization · rate comparison · extra payment simulator</small></span><b>Try free →</b></a><a href="/diy-seo/" style={{ ...styles.loan, background: "linear-gradient(135deg,#059669,#047857)", marginTop: 12 }}><span><i>FREE GUIDE</i><strong>DIY SEO — Skip the Agency</strong><small>7 free tools · step-by-step checklist · what agencies charge vs what you can do yourself</small></span><b>Read free →</b></a><h2 style={{ ...styles.sectionTitle, marginTop: 44 }}>More handy tools</h2>{["Calculators", "International", "Developer Tools", "SEO", "Content Tools", "Converters", "Image Tools", "Wellness", "Fun Tools", "Productivity"].map(cat => <CategorySection key={cat} category={cat} tools={toolsData.filter(t => t.category === cat)} />)}</section></main>;
}

function TakeHome({ country: initial, c: initialC, salary: initialSalary }) {
  const [country, setCountry] = useState(initial); const [salary, setSalary] = useState(initialSalary);
  useEffect(() => { setCountry(initial); setSalary(initialSalary); }, [initial, initialSalary]);
  const c = COUNTRIES[country]; const net = CALC[country](salary); const step = country === "jp" ? 100000 : 1000; const rounded = Math.round(salary / (country === "jp" ? 100000 : 5000)) * (country === "jp" ? 100000 : 5000);
  return <section id="take-home" style={styles.takeSection}><div style={styles.takeCard}><div style={styles.takeHead}><div><div style={styles.sectionKicker}>THE NUMBER THAT MATTERS</div><h2 style={{ ...styles.sectionTitle, color: "#fff", marginBottom: 7 }}>What lands in your account?</h2><p style={styles.muted}>A live estimate after tax and mandatory deductions.</p></div><div style={styles.toggle}>{Object.keys(COUNTRIES).map(id => <button key={id} onClick={() => { setCountry(id); setSalary(COUNTRIES[id].min + Math.round((salary - c.min) / 1000) * 1000); }} style={{ ...styles.toggleButton, ...(country === id ? styles.toggleActive : {}) }}>{COUNTRIES[id].label}</button>)}</div></div><div style={styles.salaryLine}><span>Gross yearly salary</span><strong>{money(c, salary)}</strong></div><input aria-label="Gross yearly salary" type="range" min={c.min} max={c.max} step={step} value={Math.min(c.max, Math.max(c.min, salary))} onChange={e => setSalary(Number(e.target.value))} style={styles.range} /><div style={styles.rangeLabels}><span>{money(c, c.min)}</span><span>{money(c, c.max)}</span></div><div style={styles.netResult}><div style={styles.statBlock}><small>ESTIMATED TAKE-HOME / YEAR</small><strong>{money(c, net)}</strong></div><div style={styles.statBlock}><small>PER MONTH</small><strong>{money(c, net / 12)}</strong></div><div style={{ ...styles.statBlock, ...styles.rate }}><small>EFFECTIVE RATE</small><strong>{((salary - net) / salary * 100).toFixed(1)}%</strong></div></div><div style={styles.takeLinks}>{c.slug && <a href={`/${c.slug}/${rounded}/`}>Full breakdown →</a>}<a href={c.hub}>Open full calculator ↗</a><span>{c.label} {c.year} tax year · estimate, not advice</span></div></div></section>;
}

function CategorySection({ category, tools }) { const [expanded, setExpanded] = useState(false); const color = CATEGORY_COLORS[category] || DEFAULT_COLOR; const visible = expanded ? tools : tools.slice(0, 10); return <section id={category === "Developer Tools" ? "developer-tools" : undefined} style={styles.category}><div style={styles.categoryHead}><h3>{category} <small style={{ background: color.badge }}>{tools.length}</small></h3>{tools.length > 10 && <button onClick={() => setExpanded(!expanded)} style={{ ...styles.more, color: color.badge }}>{expanded ? "Show less ↑" : `Show ${tools.length - 10} more →`}</button>}</div><ToolGrid tools={visible} /></section>; }
function ToolGrid({ tools }) { return <div style={styles.grid}>{tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}</div>; }
function ToolCard({ tool }) { const color = CATEGORY_COLORS[tool.category] || DEFAULT_COLOR; return <a href={tool.url} target="_blank" rel="noopener noreferrer" onClick={() => trackRecentTool(tool)} style={{ textDecoration: "none" }}><div className="tool-card" style={styles.toolCard}><div style={styles.toolName}><span>{tool.emoji}</span><b>{tool.name}</b></div><em style={{ background: color.light, color: color.text }}>{tool.category}</em><p>{tool.description}</p><strong style={{ color: color.badge }}>Open →</strong></div></a>; }
function BlogSection({ activeCategory }) { const posts = BLOG_POSTS.filter(p => activeCategory === "All" || p.categories.includes(activeCategory)); const visible = posts.length ? posts : BLOG_POSTS; return <section style={styles.blog}><div style={styles.sectionKicker}>FROM THE BLOG</div><div style={styles.blogHead}><h2>Free guides to help you understand the numbers</h2><a href="/blog/">View all →</a></div><div style={styles.blogGrid}>{visible.map(p => <a href={p.url} key={p.url} className="tool-card" style={styles.post}><em>GUIDE</em><b>{p.title}</b><p>{p.desc}</p><strong>Read →</strong></a>)}</div></section>; }

const styles = {
  page: { fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f1f5f9", color: "#1e293b", minHeight: "100vh" },
  /* ── Top nav ── */
  topNav: { background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 32px", display: "flex", alignItems: "center", gap: 28, height: 56, position: "sticky", top: 0, zIndex: 10, boxShadow: "0 1px 3px rgba(0,0,0,.05)" },
  brand: { fontSize: 18, fontWeight: 900, letterSpacing: "-.5px", color: "#1a1a2e", flexShrink: 0 },
  topNavLinks: { display: "flex", gap: 2, flex: 1 },
  topNavLink: { fontSize: 13, fontWeight: 600, color: "#475569", textDecoration: "none", padding: "6px 11px", borderRadius: 7, whiteSpace: "nowrap" },
  topNavRight: { marginLeft: "auto", flexShrink: 0 },
  searchNavBtn: { display: "flex", alignItems: "center", gap: 8, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 14px", fontSize: 13, color: "#94a3b8", cursor: "pointer", whiteSpace: "nowrap" },
  kbd: { background: "#e2e8f0", borderRadius: 4, padding: "1px 6px", fontSize: 11, color: "#64748b", fontFamily: "monospace" },
  /* ── Hero ── */
  hero: { background: "#fff", borderBottom: "1px solid #e2e8f0" },
  heroSplit: { maxWidth: 1200, margin: "0 auto", padding: "56px 40px 52px", display: "flex", gap: 64, alignItems: "center" },
  heroLeft: { flex: "1 1 0", minWidth: 0 },
  heroRight: { flex: "0 0 400px", width: 400 },
  heroKicker: { display: "inline-flex", alignItems: "center", gap: 8, background: "#eff6ff", border: "1px solid #bfdbfe", color: "#3b82f6", fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", padding: "5px 13px", borderRadius: 99, marginBottom: 22 },
  heroDot: { width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0, boxShadow: "0 0 5px #22c55e" },
  heroTitle: { margin: "0 0 18px", fontSize: "clamp(36px,4.5vw,54px)", letterSpacing: -2.5, lineHeight: 1.06, fontWeight: 900, color: "#0f172a" },
  heroSub: { color: "#64748b", margin: "0 0 30px", fontSize: 16, lineHeight: 1.7, maxWidth: 480 },
  searchWrap: { position: "relative", marginBottom: 24, maxWidth: 500 },
  searchIcon: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 20, color: "#94a3b8", pointerEvents: "none", zIndex: 1 },
  search: { width: "100%", boxSizing: "border-box", padding: "13px 42px 13px 42px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#1e293b", fontSize: 15, outline: "none" },
  clear: { position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", background: "none", border: 0, color: "#94a3b8", fontSize: 22, cursor: "pointer", lineHeight: 1 },
  trustRow: { display: "flex", gap: 22, flexWrap: "wrap" },
  trustItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b", fontWeight: 600 },
  /* ── Hero card ── */
  heroCard: { background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "22px 24px", boxShadow: "0 4px 24px rgba(15,23,42,.09)" },
  heroCardLabel: { fontSize: 10, fontWeight: 800, letterSpacing: "1.5px", color: "#94a3b8", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" },
  liveBadge: { background: "#dcfce7", color: "#16a34a", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 99, letterSpacing: ".8px" },
  heroCardTitle: { fontSize: 15, fontWeight: 800, color: "#1e293b", marginBottom: 12 },
  heroCardToggle: { display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 16 },
  heroCardToggleBtn: { border: "1px solid #e2e8f0", background: "#f8fafc", color: "#475569", padding: "5px 10px", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer" },
  heroCardToggleActive: { background: "#eef2ff", color: "#4338ca", borderColor: "#818cf8" },
  heroCardSalRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 },
  heroNetRow: { display: "flex", justifyContent: "space-between", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "13px 16px", marginBottom: 14 },
  heroNetBlock: { display: "flex", flexDirection: "column", gap: 4 },
  heroCardCta: { display: "block", textAlign: "center", background: "#4f46e5", color: "#fff", borderRadius: 9, padding: "11px", fontSize: 13, fontWeight: 700, textDecoration: "none" },
  /* ── Popular bar ── */
  popularBar: { background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "11px 32px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  popLabel: { fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap", marginRight: 4 },
  popLink: { background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#475569", padding: "5px 13px", borderRadius: 99, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", textDecoration: "none" },
  /* ── keep legacy keys used below the fold ── */
  toggleButton: { background: "transparent", border: 0, color: "#c7d2fe", borderRadius: 6, padding: "8px 12px", fontWeight: 700, cursor: "pointer" }, statBlock: { display: "flex", flexDirection: "column", gap: 7, minWidth: 0 },
   countryBar: { background: "#fff", borderBottom: "1px solid #e2e8f0" }, countryInner: { maxWidth: 1200, margin: "auto", padding: "10px 20px", display: "flex", gap: 7, alignItems: "center", overflowX: "auto" }, countryLabel: { fontSize: 12, color: "#64748b", fontWeight: 700, whiteSpace: "nowrap", marginRight: 4 }, countryButton: { border: "1px solid #e2e8f0", background: "#f8fafc", color: "#475569", padding: "7px 13px", borderRadius: 20, fontWeight: 700, whiteSpace: "nowrap", cursor: "pointer" }, countryActive: { background: "#eef2ff", color: "#4338ca", borderColor: "#818cf8" },
  recent: { background: "#1a1a2e", color: "#64748b", padding: "9px 20px", display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center", fontSize: 12 }, filter: { position: "sticky", top: 0, zIndex: 5, background: "#1e293b", boxShadow: "0 2px 8px #0002" }, filterInner: { maxWidth: 1200, margin: "auto", padding: "9px 20px", display: "flex", gap: 6, overflowX: "auto", alignItems: "center" }, pill: { border: 0, borderRadius: 20, padding: "7px 12px", fontWeight: 700, whiteSpace: "nowrap", cursor: "pointer" }, blogLink: { color: "#c7d2fe", textDecoration: "none", marginLeft: "auto", whiteSpace: "nowrap", padding: "7px 12px" },
  takeSection: { background: "#17213b", padding: "44px 20px" }, takeCard: { maxWidth: 900, margin: "auto", background: "linear-gradient(135deg,#202b51,#16213e)", border: "1px solid #3d4c7c", borderRadius: 18, padding: "25px clamp(18px,4vw,42px)", color: "#fff", boxShadow: "0 12px 35px #0f172a55" }, takeHead: { display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }, sectionKicker: { color: "#818cf8", fontSize: 11, letterSpacing: 1.5, fontWeight: 800 }, sectionTitle: { fontSize: 26, letterSpacing: -.7, margin: "5px 0 18px", color: "#1e293b" }, muted: { color: "#a5b4fc", margin: 0, fontSize: 13 }, toggle: { display: "flex", background: "#111a31", padding: 4, borderRadius: 9, height: "fit-content" }, toggleActive: { background: "#4f46e5", color: "#fff" }, salaryLine: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 30, color: "#c7d2fe", fontSize: 14 }, salaryLineStrong: {}, range: { width: "100%", accentColor: "#818cf8", margin: "15px 0 3px", cursor: "pointer", minHeight: 30 }, rangeLabels: { display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: 11 }, netResult: { display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 25, paddingTop: 22, borderTop: "1px solid #ffffff1c" }, netResultStrong: {}, rate: { textAlign: "right", color: "#c7d2fe" }, takeLinks: { display: "flex", gap: 18, flexWrap: "wrap", marginTop: 25, fontSize: 13 }, content: { maxWidth: 1200, margin: "auto", padding: "38px 20px 55px" }, featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }, feature: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 20, display: "flex", gap: 14, textDecoration: "none", boxShadow: "0 2px 6px #0f172a08" }, featureIcon: { fontSize: 28, color: "#4f46e5" }, loan: { margin: "18px 0 38px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "#fff", borderRadius: 14, padding: "20px 23px", textDecoration: "none" }, grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(175px,1fr))", gap: 10 }, category: { marginBottom: 36 }, categoryHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }, more: { background: "none", border: 0, fontWeight: 700, cursor: "pointer" }, toolCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 13px", minHeight: 116, boxSizing: "border-box", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px #0f172a08" }, toolName: { display: "flex", gap: 8, alignItems: "center", fontSize: 13 }, toolCardCategory: { alignSelf: "flex-start", fontStyle: "normal", fontSize: 10, padding: "2px 5px", borderRadius: 4, margin: "7px 0 5px" }, toolCardDescription: { fontSize: 11, color: "#64748b", lineHeight: 1.4, margin: "0 0 8px", flex: 1 }, result: { color: "#64748b", marginBottom: 15 }, empty: { minHeight: 240, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "#94a3b8", fontSize: 34 }, blog: { maxWidth: 1200, margin: "0 auto", padding: "10px 20px 60px" }, blogHead: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 15 }, blogGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12 }, post: { textDecoration: "none", minHeight: 150 }, footer: { background: "#1a1a2e", color: "#94a3b8", padding: "30px 20px", textAlign: "center", display: "flex", flexDirection: "column", gap: 7, fontSize: 13 },
};

function ExtensionBanner() {
  const [hidden, setHidden] = useState(() => {
    try { return localStorage.getItem("ext-banner-dismissed") === "1"; } catch { return false; }
  });
  if (hidden) return null;
  return (
    <div style={{ background: "#4f46e5", padding: "9px 40px 9px 20px", textAlign: "center", position: "relative" }}>
      <a href="/chrome-extension/" style={{ color: "#fff", fontSize: 13.5, fontWeight: 700, textDecoration: "none" }}>
        Tired of opening tabs? Get the free Chrome extension &rarr;
      </a>
      <button
        onClick={() => { setHidden(true); try { localStorage.setItem("ext-banner-dismissed", "1"); } catch {} }}
        aria-label="Dismiss"
        style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#c7d2fe", fontSize: 16, cursor: "pointer", lineHeight: 1 }}
      >&times;</button>
    </div>
  );
}
