import React, { useState } from 'react';
import toolsConfig from './tools.config.json';

export default function App() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqItems = [
    {
      q: "Are all tools truly free?",
      a: "Yes. All 10 utility tools are 100% free forever with no sign-up required. Our 3 hybrid tools (Email Writer, Content Repurposer, AI Summarizer) offer free tiers with optional paid upgrades for power users."
    },
    {
      q: "Do you store my data?",
      a: "No. All utility tools run entirely in your browser—nothing is sent to our servers. We never store, log, or use your data. Hybrid tools (subscriptions) store your preferences to improve results, but you can delete anytime."
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
      a: "Yes. Most utility tools work offline. Hybrid tools (Email Writer, Summarizer) need internet for AI features, but your data stays private."
    }
  ];

  const ToolCarousel = ({ tools }) => {
    const scrollRef = React.useRef(null);
    
    const scroll = (direction) => {
      if (scrollRef.current) {
        const scrollAmount = 300;
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    return (
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onWheel={(e) => {
            e.preventDefault();
            scroll(e.deltaY > 0 ? 'right' : 'left');
          }}
        >
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>
          
          {tools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                minWidth: '200px',
                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(79, 70, 229, 0.2) 100%)',
                border: '0.5px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '16px',
                padding: '1.5rem',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.6)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(6, 182, 212, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(79, 70, 229, 0.2) 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '28px' }}>{tool.emoji}</span>
                <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '4px 10px', borderRadius: '12px', border: '0.5px solid rgba(16, 185, 129, 0.3)' }}>Live</span>
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', margin: '0 0 8px' }}>{tool.name}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(209, 213, 219, 0.8)', margin: '0', lineHeight: '1.4' }}>{tool.description}</p>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: '500' }}>Open Tool →</span>
              </div>
            </a>
          ))}
        </div>
        
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          style={{
            position: 'absolute',
            left: '-40px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(59, 130, 246, 0.2)',
            border: '0.5px solid rgba(59, 130, 246, 0.4)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#60a5fa',
            fontSize: '16px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
          }}
        >
          ←
        </button>
        
        <button
          onClick={() => scroll('right')}
          style={{
            position: 'absolute',
            right: '-40px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(59, 130, 246, 0.2)',
            border: '0.5px solid rgba(59, 130, 246, 0.4)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#60a5fa',
            fontSize: '16px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
          }}
        >
          →
        </button>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f172a 0%, #1a1f35 50%, #0f172a 100%)', color: '#e5e7eb' }}>
      {/* Navigation */}
      <nav style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '0.5px solid rgba(59, 130, 246, 0.2)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '700', background: 'linear-gradient(90deg, #60a5fa, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', margin: 0 }}>
            Tabutility
          </h1>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '14px' }}>
            <a href="#faq" style={{ color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = '#d1d5db'}>FAQ</a>
            <a href="#about" style={{ color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = '#d1d5db'}>About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '3rem 1rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', marginBottom: '1rem', padding: '0.5rem 1rem', background: 'rgba(59, 130, 246, 0.1)', border: '0.5px solid rgba(59, 130, 246, 0.3)', borderRadius: '2rem', fontSize: '12px', color: '#60a5fa' }}>
          ✨ Building in Public
        </div>
        
        <h1 style={{ fontSize: '3.5rem', fontWeight: '700', margin: '1rem 0', background: 'linear-gradient(90deg, #ffffff 0%, #60a5fa 50%, #06b6d4 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', lineHeight: '1.2' }}>
          Free Tools for Developers & Creators
        </h1>
        
        <p style={{ fontSize: '1.1rem', color: '#9ca3af', marginBottom: '2rem', maxWidth: '600px', margin: '1.5rem auto' }}>
          No sign-up. No tracking. No BS. 13 powerful utilities built by a solo founder who actually cares about your privacy.
        </p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '500px', margin: '2rem auto' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))', border: '0.5px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#60a5fa' }}>13</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Tools Live</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.1))', border: '0.5px solid rgba(168, 85, 247, 0.2)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#a855f7' }}>100%</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Free Forever</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))', border: '0.5px solid rgba(6, 182, 212, 0.2)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#06b6d4' }}>0</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Sign-ups</div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section style={{ padding: '2rem 1rem', maxWidth: '1400px', margin: '0 auto' }}>
        {Object.entries(toolsConfig.categories).map(([categoryKey, category]) => (
          <div key={categoryKey} style={{ marginBottom: '3rem', paddingLeft: '40px', paddingRight: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '28px' }}>{category.emoji}</span>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#ffffff', margin: 0 }}>{category.name}</h2>
            </div>
            
            <ToolCarousel tools={category.tools} />
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '3rem 1rem', maxWidth: '800px', margin: '0 auto', borderTop: '0.5px solid rgba(59, 130, 246, 0.2)', borderBottom: '0.5px solid rgba(59, 130, 246, 0.2)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem', color: '#ffffff' }}>Questions?</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqItems.map((item, idx) => (
            <div key={idx} style={{ border: '0.5px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', background: 'rgba(30, 58, 138, 0.2)', overflow: 'hidden', transition: 'all 0.2s' }}>
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
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {item.q}
                <span style={{ color: '#60a5fa', fontSize: '18px', transition: 'transform 0.2s', transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
              </button>
              
              {expandedFaq === idx && (
                <div style={{ padding: '1rem 1.5rem', borderTop: '0.5px solid rgba(59, 130, 246, 0.2)', color: '#d1d5db', fontSize: '14px', lineHeight: '1.6', background: 'rgba(15, 23, 42, 0.5)' }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '3rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#ffffff' }}>About Tabutility</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))', border: '0.5px solid rgba(59, 130, 246, 0.2)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>🚀</div>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#60a5fa', margin: '0 0 0.5rem' }}>Built to Last</h3>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, lineHeight: '1.5' }}>Simple, useful tools that actually solve problems. No bloat. No nonsense.</p>
          </div>
          
          <div style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.1))', border: '0.5px solid rgba(168, 85, 247, 0.2)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>🔒</div>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#a855f7', margin: '0 0 0.5rem' }}>Private by Default</h3>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, lineHeight: '1.5' }}>All processing in your browser. Your data stays yours. No tracking.</p>
          </div>
          
          <div style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))', border: '0.5px solid rgba(6, 182, 212, 0.2)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>📖</div>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#06b6d4', margin: '0 0 0.5rem' }}>Building in Public</h3>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, lineHeight: '1.5' }}>Sharing the journey. Revenue numbers, wins, and failures. All honest.</p>
          </div>
        </div>

        <div style={{ background: 'rgba(30, 58, 138, 0.15)', border: '0.5px solid rgba(59, 130, 246, 0.2)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '15px', color: '#d1d5db', lineHeight: '1.8', margin: '0 0 1rem' }}>
            I started Tabutility because I was frustrated. Most online tools are either outdated, bloated, or designed to extract money from you. As a non-technical founder, I decided to build something different — tools that are genuinely useful, completely free, and honest about how they work.
          </p>
          <p style={{ fontSize: '15px', color: '#d1d5db', lineHeight: '1.8', margin: 0 }}>
            Building in public means sharing everything: revenue, growth metrics, failures, and learnings. No PR spin. No polished narrative. Just real. This is a solo project, and I'm learning as I go. But every tool works, and every tool respects your privacy.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '1.5rem' }}>Follow the journey on Reddit and Indie Hackers. Share your thoughts. Help us build something worth using.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://reddit.com/r/webdev" target="_blank" rel="noopener noreferrer" style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#ffffff', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              Follow on Reddit
            </a>
            <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer" style={{ padding: '0.75rem 1.5rem', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '0.5px solid rgba(59, 130, 246, 0.4)', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              Indie Hackers
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem 1rem', borderTop: '0.5px solid rgba(59, 130, 246, 0.2)', textAlign: 'center', fontSize: '13px', color: '#6b7280' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '0.75rem' }}>Tabutility</h3>
              <p style={{ margin: 0, fontSize: '12px' }}>Free tools built by a solo founder. No tracking. No BS.</p>
            </div>
            <div>
              <h3 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '0.75rem' }}>Legal</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>Privacy Policy</a>
                <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>Terms of Service</a>
              </div>
            </div>
            <div>
              <h3 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '0.75rem' }}>Community</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>Reddit</a>
                <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>Indie Hackers</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '0.5px solid rgba(59, 130, 246, 0.2)', paddingTop: '1.5rem' }}>
          <p style={{ margin: 0 }}>© 2026 Tabutility. Built with ❤️ in public. No venture capital. No exit strategy. Just tools that work.</p>
        </div>
      </footer>
    </div>
  );
}
