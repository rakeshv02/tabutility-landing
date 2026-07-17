import React, { useState, useEffect } from 'react';
import toolsConfig from './tools.config.json';

export default function App() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showMoreTools, setShowMoreTools] = useState({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqItems = [
    { q: "Are all tools truly free?", a: "Yes. All 10 utility tools are 100% free forever with no sign-up required. Our 3 hybrid tools (Email Writer, Content Repurposer, AI Summarizer) offer free tiers with optional paid upgrades for power users." },
    { q: "Do you store my data?", a: "No. All utility tools run entirely in your browser—nothing is sent to our servers. We never store, log, or use your data. Hybrid tools store your preferences to improve results, but you can delete anytime." },
    { q: "Why are these tools free?", a: "We believe useful tools should be accessible to everyone. We're supported by non-intrusive ads and optional subscriptions for advanced features. No tracking. No selling your data." },
    { q: "How often are new tools added?", a: "We're building in public. New tools launch regularly as we identify problems worth solving. Follow us on Reddit and Indie Hackers for updates." },
    { q: "Can I use these tools offline?", a: "Yes. Most utility tools work offline. Hybrid tools need internet for AI features, but your data stays private." }
  ];

  const colorMap = {
    'Text & Coding Tools': { icon: '#4B7FED', border: '#4B7FED', light: '#EEF1FF' },
    'Developer Utilities':  { icon: '#FF7A3B', border: '#FF7A3B', light: '#FFF4EE' },
    'Developer Tools':      { icon: '#FF7A3B', border: '#FF7A3B', light: '#FFF4EE' },
    'General Utilities':    { icon: '#27C281', border: '#27C281', light: '#EEFBF5' },
    'Image Tools':          { icon: '#9B6EDE', border: '#9B6EDE', light: '#F7F1FF' },
    'Calculators':          { icon: '#FFB84D', border: '#FFB84D', light: '#FFFBF0' },
    'Content Tools':        { icon: '#FF6B9D', border: '#FF6B9D', light: '#FFE8F5' }
  };

  const valueProps = [
    { title: 'Private by Default', desc: 'All processing in your browser. Your data never leaves your device.', color: '#27C281', light: '#EEFBF5', icon: '🔒' },
    { title: '100% Free', desc: '10 utilities forever free. Premium features optional.', color: '#4B7FED', light: '#EEF1FF', icon: '✓' },
    { title: 'No Sign-up', desc: 'Start instantly. No email, no account, no questions.', color: '#FF7A3B', light: '#FFF4EE', icon: '→' },
    { title: 'Built in Public', desc: 'Follow the journey. See revenue, wins, and real numbers.', color: '#9B6EDE', light: '#F7F1FF', icon: '🏗️' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f4', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#1a1a1a' }}>

      {/* ── Navigation ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        padding: '1rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrolled ? 'rgba(248,247,244,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.04)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: 700 }}>
          <div style={{ width: '34px', height: '34px', background: '#1a1a1a', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'white' }}>⌘</div>
          Tabutility
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '14px', fontWeight: 500 }}>
          {['Tools', 'FAQ', 'About'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{ color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#0f172a'}
              onMouseLeave={e => e.target.style.color = '#555'}>
              {link}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: '5rem 2rem 4rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '999px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.8px', color: '#555', marginBottom: '1.5rem' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#27C281', display: 'inline-block' }}></span>
          FREE TOOLS, REAL PRIVACY
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 68px)', fontWeight: 800, margin: '0 0 1.25rem', color: '#0f172a', lineHeight: 1.08, letterSpacing: '-1.5px' }}>
          Tools That Actually<br />
          <span style={{ color: '#4B7FED' }}> Respect You</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
          No sign-up. No tracking. No BS. 13 free utilities built by a solo founder who actually cares about your privacy.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#tools" style={{ padding: '14px 28px', background: '#0f172a', color: 'white', borderRadius: '12px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(15,23,42,0.2)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.28)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,23,42,0.2)'; }}>
            Explore Tools
          </a>
          <a href="#about" style={{ padding: '14px 28px', background: 'white', color: '#334155', borderRadius: '12px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}>
            Read the Story
          </a>
        </div>
      </section>

      {/* ── AdSense Slot 1 (below hero) ────────────────────────────────
           When approved, replace this comment with your <ins> tag:
           <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true" />
      ─────────────────────────────────────────────────────────────── */}

      {/* ── Value Props ── */}
      <section style={{ padding: '1rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {valueProps.map((prop, i) => (
            <div key={i}
              style={{ background: 'white', borderRadius: '18px', padding: '2rem 1.75rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 30px -4px rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(0,0,0,0.06)'}>
              <div style={{ width: '52px', height: '52px', background: prop.light, color: prop.color, borderRadius: '14px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700 }}>{prop.icon}</div>
              <h3 style={{ margin: '0 0 0.4rem', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{prop.title}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tools ── */}
      <section id="tools" style={{ padding: '1rem 2rem 5rem', background: 'white', marginBottom: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 800, margin: '0 0 2.5rem', color: '#0f172a', textAlign: 'center', letterSpacing: '-0.5px' }}>
            13 Tools, All Free.
          </h2>

          {Object.entries(toolsConfig.categories).map(([categoryKey, category]) => {
            const colors = colorMap[category.name] || { icon: '#4B7FED', border: '#4B7FED', light: '#EEF1FF' };
            const isExpanded = showMoreTools[categoryKey];
            const toolsToShow = isExpanded ? category.tools : category.tools.slice(0, 4);
            const hasMore = category.tools.length > 4;

            return (
              <div key={categoryKey} style={{ marginBottom: '3.5rem' }}>
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '22px' }}>{category.emoji}</span>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{category.name}</h3>
                  <span style={{ padding: '2px 9px', background: '#f1f5f9', borderRadius: '999px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>{category.tools.length}</span>
                </div>

                {/* Tool cards — fixed 210px width, flex-wrap so they never stretch */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '1rem' }}>
                  {toolsToShow.map((tool) => (
                    <a
                      key={tool.id}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '210px',
                        flexShrink: 0,
                        background: colors.light,
                        borderRadius: '14px',
                        padding: '1.4rem 1.25rem',
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        border: '1px solid transparent',
                        transition: 'all 0.2s ease',
                        boxSizing: 'border-box'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = '0 6px 20px -4px rgba(0,0,0,0.12)';
                        e.currentTarget.style.borderColor = colors.border + '50';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = '';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.transform = '';
                      }}
                    >
                      <div style={{ width: '46px', height: '46px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                        {tool.emoji}
                      </div>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{tool.name}</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>{tool.description}</p>
                      <div style={{ marginTop: 'auto', paddingTop: '6px', fontSize: '12px', fontWeight: 700, color: colors.icon }}>Open →</div>
                    </a>
                  ))}
                </div>

                {hasMore && !isExpanded && (
                  <button
                    onClick={() => setShowMoreTools({ ...showMoreTools, [categoryKey]: true })}
                    style={{ padding: '8px 16px', background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#1e293b'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#475569'; }}
                  >
                    See {category.tools.length - 4} more ▾
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── AdSense Slot 2 (between tools and FAQ) ─────────────────────
           When approved, replace this comment with your <ins> tag:
           <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true" />
      ─────────────────────────────────────────────────────────────── */}

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>Questions?</h2>
          <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>Everything you need to know about Tabutility.</p>
        </div>
        {faqItems.map((item, idx) => {
          const isOpen = expandedFaq === idx;
          return (
            <div key={idx} style={{ background: 'white', border: isOpen ? '1px solid #cbd5e1' : '1px solid #f1f5f9', borderRadius: '14px', overflow: 'hidden', marginBottom: '10px', boxShadow: isOpen ? '0 4px 16px rgba(0,0,0,0.06)' : 'none', transition: 'all 0.2s' }}>
              <button
                onClick={() => setExpandedFaq(isOpen ? null : idx)}
                style={{ width: '100%', padding: '1.1rem 1.5rem', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: '12px' }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>{item.q}</span>
                <span style={{ flexShrink: 0, width: '30px', height: '30px', borderRadius: '50%', background: isOpen ? '#0f172a' : '#f1f5f9', color: isOpen ? 'white' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all 0.25s ease' }}>▼</span>
              </button>
              {isOpen && (
                <div style={{ padding: '0 1.5rem 1.25rem', color: '#475569', fontSize: '14px', lineHeight: 1.7 }}>{item.a}</div>
              )}
            </div>
          );
        })}
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: '2rem 2rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ background: '#0f172a', borderRadius: '24px', padding: '3.5rem', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-block', padding: '5px 14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>The Founder Story</div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 1.5rem', letterSpacing: '-0.5px' }}>Why Tabutility Exists</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 1rem' }}>
              I started Tabutility because I was frustrated. Most online tools are either outdated, bloated, or designed to extract money from you. As a non-technical founder, I decided to build something different — tools that are genuinely useful, completely free, and honest about how they work.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 2rem' }}>
              Building in public means sharing everything: revenue, growth metrics, failures, and learnings. No PR spin. No polished narrative. Just real.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://reddit.com/r/webdev" target="_blank" rel="noopener noreferrer"
                style={{ padding: '12px 22px', background: 'rgba(255,69,0,0.12)', color: '#FF6534', border: '1px solid rgba(255,69,0,0.2)', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,69,0,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,69,0,0.12)'}>
                Follow on Reddit
              </a>
              <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer"
                style={{ padding: '12px 22px', background: 'rgba(84,197,150,0.12)', color: '#54C596', border: '1px solid rgba(84,197,150,0.2)', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(84,197,150,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(84,197,150,0.12)'}>
                Indie Hackers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: 'white', borderTop: '1px solid #f1f5f9', padding: '3.5rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '18px', color: '#0f172a', marginBottom: '0.75rem' }}>
              <div style={{ width: '30px', height: '30px', background: '#0f172a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: 'white' }}>⌘</div>
              Tabutility
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>Free tools built by a solo founder. No tracking. No BS. Just tools that work.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', marginTop: 0 }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="/privacy" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = '#64748b'}>Privacy Policy</a>
              <a href="/terms" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = '#64748b'}>Terms of Service</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', marginTop: 0 }}>Community</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = '#64748b'}>Reddit</a>
              <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = '#64748b'}>Indie Hackers</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
          <p style={{ margin: 0 }}>© 2026 Tabutility. Built with ❤️ in public. No venture capital. No exit strategy. Just tools that work.</p>
          <p style={{ margin: 0 }}>Designed for humans, not trackers.</p>
        </div>
      </footer>

    </div>
  );
}
