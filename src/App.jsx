import React, { useState, useEffect } from 'react';
import toolsConfig from './tools.config.json';

const colorMap = {
  'Calculators':    { icon: '#2563eb', light: '#EFF6FF' },
  'Image Tools':    { icon: '#10b981', light: '#ECFDF5' },
  'Developer Tools':{ icon: '#f59e0b', light: '#FFFBEB' },
  'Content Tools':  { icon: '#ec4899', light: '#FDF2F8' },
  'Wellness':       { icon: '#8b5cf6', light: '#F7F1FF' },
};

const faqs = [
  { q: 'Are all tools truly free?',      a: 'Yes. All 11 utility tools are 100% free forever with no sign-up required. Our 3 hybrid tools (Email Writer, Content Repurposer, AI Summarizer) offer free tiers with optional paid upgrades for power users.' },
  { q: 'Do you store my data?',          a: 'No. All utility tools run entirely in your browser—nothing is sent to our servers. We never store, log, or use your data. Hybrid tools store your preferences to improve results, but you can delete anytime.' },
  { q: 'Why are these tools free?',      a: "We believe useful tools should be accessible to everyone. We're supported by non-intrusive ads and optional subscriptions for advanced features. No tracking. No selling your data." },
  { q: 'How often are new tools added?', a: "We're building in public. New tools launch regularly as we identify problems worth solving. Follow us on Reddit and Indie Hackers for updates." },
  { q: 'Can I use these tools offline?', a: 'Yes. Most utility tools work offline. Hybrid tools need internet for AI features, but your data stays private.' },
];

const valueProps = [
  { title: 'Private by Default', desc: 'Everything runs locally in your browser. No data leaves your machine.',             color: '#27C281', light: '#EEFBF5', emoji: '🔒' },
  { title: '100% Free',          desc: 'No hidden fees, no credit card required. Free tools forever.',                      color: '#4B7FED', light: '#EEF1FF', emoji: '💰' },
  { title: 'No Sign-up',         desc: 'Jump straight into solving your problem without creating an account.',              color: '#FF7A3B', light: '#FFF4EE', emoji: '🚀' },
  { title: 'Built in Public',    desc: 'Follow the journey. See revenue, wins, and real numbers.',                          color: '#9B6EDE', light: '#F7F1FF', emoji: '📊' },
];

export default function App() {
  const [expandedFaq, setExpandedFaq]   = useState(null);
  const [showMoreTools, setShowMoreTools] = useState({});
  const [scrolled, setScrolled]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sort categories by tool count descending so fuller sections appear first
  const sortedCategories = Object.entries(toolsConfig.categories)
    .sort(([, a], [, b]) => b.tools.length - a.tools.length);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f4', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#0f172a', margin: 0, padding: 0 }}>

      {/* ── Nav ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '12px 32px' : '20px 32px',
        background: scrolled ? 'rgba(248,247,244,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 20 }}>
          <div style={{ width: 32, height: 32, background: '#0f172a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18 }}>⌘</div>
          Tabutility
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 500 }}>
          {['Tools','FAQ','About'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color: '#64748b', textDecoration: 'none' }}
              onMouseEnter={e => e.target.style.color = '#0f172a'}
              onMouseLeave={e => e.target.style.color = '#64748b'}>
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#475569', textTransform: 'uppercase', marginBottom: 24 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
          Free Tools, Real Privacy
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, margin: '0 0 24px', lineHeight: 1.1, letterSpacing: '-1px', color: '#0f172a' }}>
          Tools That Actually<br />
          <span style={{ color: '#4B7FED' }}>Respect You.</span>
        </h1>
        <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 36px' }}>
          14 browser-based utilities for text, dev, wellness, and daily tasks. No ads tracking you, no paywalls, and absolutely no sign-ups required.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#tools" style={{ padding: '14px 28px', background: '#0f172a', color: 'white', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 16px rgba(15,23,42,0.22)', display: 'inline-block' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}>
            Explore Tools
          </a>
          <a href="#about" style={{ padding: '14px 28px', background: 'white', color: '#334155', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'inline-block' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}>
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
      <section style={{ padding: '0 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {valueProps.map((p, i) => (
            <div key={i}
              style={{ background: 'white', borderRadius: 20, padding: '28px 24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 30px -4px rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(0,0,0,0.06)'}>
              <div style={{ width: 48, height: 48, background: p.light, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: p.color, fontSize: 24 }}>{p.emoji}</div>
              <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tools ── */}
      <section id="tools" style={{ padding: '0 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.5px' }}>14 Tools Built for You</h2>
          <p style={{ color: '#64748b', margin: 0, fontSize: 15 }}>No sign-up, no tracking, completely free.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {sortedCategories.map(([key, category]) => {
            const colors      = colorMap[category.name] || { icon: '#6b7280', light: '#f3f4f6' };
            const isSingle    = category.tools.length === 1;
            const isExpanded  = showMoreTools[key];
            const toolsToShow = isExpanded ? category.tools : category.tools.slice(0, 4);
            const hasMore     = category.tools.length > 4;

            return (
              <div key={key}>
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, background: colors.light, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.icon, fontSize: 20, fontWeight: 700 }}>{category.emoji}</div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{category.name}</h3>
                </div>

                {/* Single-tool categories → wide horizontal card */}
                {isSingle ? (
                  <a href={category.tools[0].url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 24px', background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', textDecoration: 'none', color: '#0f172a', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = colors.icon; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'; }}>
                    <div style={{ flexShrink: 0, width: 52, height: 52, background: colors.light, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                      {category.tools[0].emoji}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{category.tools[0].name}</h4>
                      <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.55 }}>{category.tools[0].description}</p>
                    </div>
                  </a>
                ) : (
                  /* Multi-tool categories → grid */
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                      {toolsToShow.map(tool => (
                        <a key={tool.id} href={tool.url} target="_blank" rel="noopener noreferrer"
                          style={{ display: 'flex', flexDirection: 'column', padding: 16, background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', textDecoration: 'none', color: '#0f172a', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = colors.icon; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'; }}>
                          <div style={{ width: 40, height: 40, background: colors.light, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                            <span style={{ fontSize: 22 }}>{tool.emoji}</span>
                          </div>
                          <h4 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{tool.name}</h4>
                          <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.55, flexGrow: 1 }}>{tool.description}</p>
                        </a>
                      ))}
                    </div>

                    {hasMore && (
                      <button onClick={() => setShowMoreTools(p => ({ ...p, [key]: !p[key] }))}
                        style={{ marginTop: 14, padding: '8px 16px', background: 'white', color: '#475569', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                        {isExpanded ? 'Show less ▴' : `See ${category.tools.length - 4} more ▾`}
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
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
      <section id="faq" style={{ padding: '64px 24px', maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.5px' }}>Questions?</h2>
          <p style={{ color: '#64748b', margin: 0, fontSize: 15 }}>Everything you need to know about Tabutility.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map((f, i) => {
            const open = expandedFaq === i;
            return (
              <div key={i} style={{ background: 'white', borderRadius: 16, border: open ? '1px solid #cbd5e1' : '1px solid #e2e8f0', boxShadow: open ? '0 4px 16px rgba(0,0,0,0.06)' : 'none', overflow: 'hidden', transition: 'all 0.2s' }}>
                <button onClick={() => setExpandedFaq(open ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>{f.q}</span>
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: open ? '#0f172a' : '#f1f5f9', color: open ? 'white' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, transform: open ? 'rotate(180deg)' : 'none', transition: 'all 0.25s' }}>▼</span>
                </button>
                {open && <div style={{ padding: '0 24px 20px', fontSize: 14, color: '#475569', lineHeight: 1.75 }}>{f.a}</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: '0 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: '#0f172a', borderRadius: 28, padding: '60px 48px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: 'rgba(255,255,255,0.04)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
          <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, background: 'rgba(59,130,246,0.08)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>The Founder Story</div>
            <h2 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 24px', letterSpacing: '-0.5px' }}>Why Tabutility Exists</h2>
            <div style={{ maxWidth: 560, margin: '0 auto', color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 16px' }}>I started Tabutility because I was frustrated. Most online tools are either outdated, bloated, or designed to extract money from you. I decided to build something different — tools that are genuinely useful, completely free, and honest about how they work.</p>
              <p style={{ margin: '0 0 36px' }}>Building in public means sharing everything: revenue, growth metrics, failures, and learnings. No PR spin. Just real.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://reddit.com/r/webdev" target="_blank" rel="noopener noreferrer"
                style={{ padding: '12px 22px', background: 'rgba(255,69,0,0.12)', color: '#FF6534', border: '1px solid rgba(255,69,0,0.2)', borderRadius: 12, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Follow on Reddit</a>
              <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer"
                style={{ padding: '12px 22px', background: 'rgba(84,197,150,0.12)', color: '#54C596', border: '1px solid rgba(84,197,150,0.2)', borderRadius: 12, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Indie Hackers</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: 'white', borderTop: '1px solid #f1f5f9', padding: '56px 24px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, color: '#0f172a', marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, background: '#0f172a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'white' }}>⌘</div>
              Tabutility
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.65 }}>Free tools built by a solo founder. No tracking. Just tools that work.</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Legal</h4>
            {[['Privacy Policy','/privacy'],['Terms of Service','/terms']].map(([label, href]) => (
              <div key={label} style={{ marginBottom: 10 }}><a href={href} style={{ color: '#64748b', textDecoration: 'none', fontSize: 13 }} onMouseEnter={e => e.target.style.color='#0f172a'} onMouseLeave={e => e.target.style.color='#64748b'}>{label}</a></div>
            ))}
          </div>
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Community</h4>
            {[['Reddit','https://reddit.com'],['Indie Hackers','https://indiehackers.com']].map(([label, href]) => (
              <div key={label} style={{ marginBottom: 10 }}><a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none', fontSize: 13 }} onMouseEnter={e => e.target.style.color='#0f172a'} onMouseLeave={e => e.target.style.color='#64748b'}>{label}</a></div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto', paddingTop: 24, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 12, color: '#94a3b8' }}>
          <span>© 2026 Tabutility. Built with ❤️ in public.</span>
          <span>Designed for humans, not trackers.</span>
        </div>
      </footer>

    </div>
  );
}
