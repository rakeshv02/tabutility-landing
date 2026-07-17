import React, { useState } from 'react';
import toolsConfig from './tools.config.json';

export default function App() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showMoreTools, setShowMoreTools] = useState({});

  const faqItems = [
    {
      q: "Are all tools truly free?",
      a: "Yes. All 10 utility tools are 100% free forever with no sign-up required. Our 3 hybrid tools (Email Writer, Content Repurposer, AI Summarizer) offer free tiers with optional paid upgrades for power users."
    },
    {
      q: "Do you store my data?",
      a: "No. All utility tools run entirely in your browser—nothing is sent to our servers. We never store, log, or use your data. Hybrid tools store your preferences to improve results, but you can delete anytime."
    },
    {
      q: "Why are these tools free?",
      a: "We believe useful tools should be accessible to everyone. We're supported by non-intrusive ads and optional subscriptions for advanced features. No tracking. No selling your data."
    },
    {
      q: "How often are new tools added?",
      a: "We're building in public. New tools launch regularly as we identify problems worth solving. Follow us on Reddit and Indie Hackers for updates."
    },
    {
      q: "Can I use these tools offline?",
      a: "Yes. Most utility tools work offline. Hybrid tools need internet for AI features, but your data stays private."
    }
  ];

  const colorMap = {
    'Text & Coding Tools': { icon: '#4B7FED', border: '#4B7FED', light: '#EEF1FF' },
    'Developer Utilities': { icon: '#FF7A3B', border: '#FF7A3B', light: '#FFF4EE' },
    'General Utilities': { icon: '#27C281', border: '#27C281', light: '#EEFBF5' },
    'Image Tools': { icon: '#9B6EDE', border: '#9B6EDE', light: '#F7F1FF' },
    'Calculators': { icon: '#FFB84D', border: '#FFB84D', light: '#FFFBF0' },
    'Content Tools': { icon: '#FF6B9D', border: '#FF6B9D', light: '#FFE8F5' }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f7f2', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Navigation */}
      <nav style={{ background: 'white', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0ede7', position: 'sticky', top: 0, zIndex: 50 }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#1a1a1a' }}>Tabutility</h1>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '14px' }}>
          <a href="#faq" style={{ color: '#666', textDecoration: 'none', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FF7A3B'} onMouseLeave={(e) => e.target.style.color = '#666'}>FAQ</a>
          <a href="#about" style={{ color: '#666', textDecoration: 'none', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FF7A3B'} onMouseLeave={(e) => e.target.style.color = '#666'}>About</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ color: '#FF7A3B', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', marginBottom: '1rem' }}>FREE TOOLS, REAL PRIVACY</div>
        
        <h1 style={{ fontSize: '48px', fontWeight: 700, margin: '0 0 1rem', color: '#1a1a1a', lineHeight: 1.1 }}>
          Tools That Actually
          <span style={{ color: '#4B7FED' }}> Respect You</span>
        </h1>
        
        <p style={{ fontSize: '16px', color: '#666', maxWidth: '600px', margin: '1rem auto 2rem', lineHeight: 1.6 }}>
          No sign-up. No tracking. No BS. 13 free utilities built by a solo founder who actually cares about your privacy.
        </p>
      </section>

      {/* Value Props */}
      <section style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem 1.5rem', borderBottom: '4px solid #FF7A3B', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#FF7A3B', borderRadius: '12px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔒</div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>Private by Default</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#999', lineHeight: 1.5 }}>All processing in your browser. Your data never leaves your device.</p>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem 1.5rem', borderBottom: '4px solid #4B7FED', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#4B7FED', borderRadius: '12px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'white' }}>✓</div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>100% Free</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#999', lineHeight: 1.5 }}>10 utilities forever free. Premium features optional.</p>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem 1.5rem', borderBottom: '4px solid #27C281', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#27C281', borderRadius: '12px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'white' }}>→</div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>No Sign-up</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#999', lineHeight: 1.5 }}>Start instantly. No email, no account, no questions.</p>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem 1.5rem', borderBottom: '4px solid #9B6EDE', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#9B6EDE', borderRadius: '12px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🏗️</div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>Built in Public</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#999', lineHeight: 1.5 }}>Follow the journey. See revenue, wins, and real numbers.</p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section style={{ padding: '3rem 2rem', background: 'white', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 2rem', color: '#1a1a1a', textAlign: 'center' }}>13 Tools, All Free</h2>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {Object.entries(toolsConfig.categories).map(([categoryKey, category]) => {
            const colors = colorMap[category.name] || { icon: '#4B7FED', border: '#4B7FED', light: '#EEF1FF' };
            const isExpanded = showMoreTools[categoryKey];
            const toolsToShow = isExpanded ? category.tools : category.tools.slice(0, 4);
            const hasMore = category.tools.length > 4;

            return (
              <div key={categoryKey} style={{ marginBottom: '3rem' }}>
                <h3 style={{ margin: '0 0 1.5rem', fontSize: '14px', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{category.emoji} {category.name}</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: hasMore ? '2rem' : 0 }}>
                  {toolsToShow.map((tool) => (
                    <a
                      key={tool.id}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: colors.light,
                        borderRadius: '12px',
                        padding: '1.5rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ width: '48px', height: '48px', background: colors.icon, borderRadius: '10px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{tool.emoji}</div>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>{tool.name}</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: '#999', lineHeight: 1.4 }}>{tool.description}</p>
                      <div style={{ marginTop: 'auto', fontSize: '12px', fontWeight: 600, color: colors.icon }}>→ Open</div>
                    </a>
                  ))}
                </div>

                {hasMore && !isExpanded && (
                  <div style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => setShowMoreTools({ ...showMoreTools, [categoryKey]: true })}
                      style={{
                        background: '#f0ede7',
                        color: '#1a1a1a',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#e8e4db';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#f0ede7';
                      }}
                    >
                      See {category.tools.length - 4} more
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', borderTop: '1px solid #f0ede7', borderBottom: '1px solid #f0ede7' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '2rem', color: '#1a1a1a' }}>Questions?</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqItems.map((item, idx) => (
            <div key={idx} style={{ border: '1px solid #f0ede7', borderRadius: '12px', background: 'white', overflow: 'hidden', transition: 'all 0.2s' }}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: '#1a1a1a',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f9f7f2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {item.q}
                <span style={{ color: '#FF7A3B', fontSize: '18px', transition: 'transform 0.2s', transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
              </button>
              
              {expandedFaq === idx && (
                <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f0ede7', color: '#666', fontSize: '14px', lineHeight: 1.6, background: '#f9f7f2' }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>About Tabutility</h2>
        
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', border: '1px solid #f0ede7' }}>
          <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, margin: '0 0 1rem' }}>
            I started Tabutility because I was frustrated. Most online tools are either outdated, bloated, or designed to extract money from you. As a non-technical founder, I decided to build something different — tools that are genuinely useful, completely free, and honest about how they work.
          </p>
          <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, margin: 0 }}>
            Building in public means sharing everything: revenue, growth metrics, failures, and learnings. No PR spin. No polished narrative. Just real. This is a solo project, and I'm learning as I go. But every tool works, and every tool respects your privacy.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: '14px', color: '#999', marginBottom: '1.5rem' }}>Follow the journey on Reddit and Indie Hackers. Share your thoughts. Help us build something worth using.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://reddit.com/r/webdev" target="_blank" rel="noopener noreferrer" style={{ padding: '0.75rem 1.5rem', background: '#4B7FED', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.background = '#3557c1'} onMouseLeave={(e) => e.target.style.background = '#4B7FED'}>
              Follow on Reddit
            </a>
            <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer" style={{ padding: '0.75rem 1.5rem', background: '#f0ede7', color: '#1a1a1a', border: '1px solid #e8e4db', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.background = '#e8e4db'} onMouseLeave={(e) => e.target.style.background = '#f0ede7'}>
              Indie Hackers
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem', borderTop: '1px solid #f0ede7', textAlign: 'center', fontSize: '12px', color: '#999', background: 'white', marginTop: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: 600, marginBottom: '0.75rem', margin: 0 }}>Tabutility</h4>
              <p style={{ margin: 0, fontSize: '12px' }}>Free tools built by a solo founder. No tracking. No BS.</p>
            </div>
            <div>
              <h4 style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: 600, marginBottom: '0.75rem', margin: 0 }}>Legal</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="/privacy" style={{ color: '#999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FF7A3B'} onMouseLeave={(e) => e.target.style.color = '#999'}>Privacy Policy</a>
                <a href="/terms" style={{ color: '#999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FF7A3B'} onMouseLeave={(e) => e.target.style.color = '#999'}>Terms of Service</a>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: 600, marginBottom: '0.75rem', margin: 0 }}>Community</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FF7A3B'} onMouseLeave={(e) => e.target.style.color = '#999'}>Reddit</a>
                <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FF7A3B'} onMouseLeave={(e) => e.target.style.color = '#999'}>Indie Hackers</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #f0ede7', paddingTop: '1.5rem' }}>
          <p style={{ margin: 0 }}>© 2026 Tabutility. Built with ❤️ in public. No venture capital. No exit strategy. Just tools that work.</p>
        </div>
      </footer>
    </div>
  );
}
