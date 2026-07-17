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
    'Developer Utilities':  { icon: '#FF7A3B', border: '#FF7A3B', light: '#FFF4EE' },
    'General Utilities':    { icon: '#27C281', border: '#27C281', light: '#EEFBF5' },
    'Image Tools':          { icon: '#9B6EDE', border: '#9B6EDE', light: '#F7F1FF' },
    'Calculators':          { icon: '#FFB84D', border: '#FFB84D', light: '#FFFBF0' },
    'Content Tools':        { icon: '#FF6B9D', border: '#FF6B9D', light: '#FFE8F5' }
  };

  const valueProps = [
    {
      title: 'Private by Default',
      desc: 'All processing in your browser. Your data never leaves your device.',
      color: '#27C281',
      light: '#EEFBF5',
      icon: '🔒'
    },
    {
      title: '100% Free',
      desc: '10 utilities forever free. Premium features optional.',
      color: '#4B7FED',
      light: '#EEF1FF',
      icon: '✓'
    },
    {
      title: 'No Sign-up',
      desc: 'Start instantly. No email, no account, no questions.',
      color: '#FF7A3B',
      light: '#FFF4EE',
      icon: '→'
    },
    {
      title: 'Built in Public',
      desc: 'Follow the journey. See revenue, wins, and real numbers.',
      color: '#9B6EDE',
      light: '#F7F1FF',
      icon: '🏗️'
    }
  ];

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#f8f7f4',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: '#1a1a1a'
    },
    nav: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: scrolled ? 'rgba(248, 247, 244, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.04)' : 'none',
      transition: 'all 0.3s ease'
    },
    navBrand: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '20px',
      fontWeight: 700,
      color: '#1a1a1a',
      textDecoration: 'none'
    },
    navLogo: {
      width: '34px',
      height: '34px',
      background: '#1a1a1a',
      borderRadius: '9px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      color: 'white'
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      fontSize: '14px',
      fontWeight: 500
    },
    navLink: {
      color: '#555',
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    hero: {
      padding: '5rem 2rem 4rem',
      textAlign: 'center',
      maxWidth: '900px',
      margin: '0 auto'
    },
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 14px',
      background: 'rgba(0,0,0,0.05)',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '0.8px',
      color: '#555',
      marginBottom: '1.5rem'
    },
    heroDot: {
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      background: '#27C281'
    },
    heroH1: {
      fontSize: 'clamp(42px, 7vw, 72px)',
      fontWeight: 800,
      margin: '0 0 1.25rem',
      color: '#0f172a',
      lineHeight: 1.08,
      letterSpacing: '-1.5px'
    },
    heroAccent: {
      color: '#4B7FED'
    },
    heroSub: {
      fontSize: '18px',
      color: '#64748b',
      maxWidth: '580px',
      margin: '0 auto 2.5rem',
      lineHeight: 1.65
    },
    heroCtas: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    ctaPrimary: {
      display: 'inline-block',
      padding: '14px 28px',
      background: '#0f172a',
      color: 'white',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '15px',
      textDecoration: 'none',
      boxShadow: '0 4px 16px rgba(15,23,42,0.2)',
      transition: 'all 0.2s'
    },
    ctaSecondary: {
      display: 'inline-block',
      padding: '14px 28px',
      background: 'white',
      color: '#334155',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '15px',
      textDecoration: 'none',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      transition: 'all 0.2s'
    },
    valueSection: {
      padding: '1rem 2rem 5rem',
      maxWidth: '1100px',
      margin: '0 auto'
    },
    valueGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px'
    },
    valueCard: {
      background: 'white',
      borderRadius: '18px',
      padding: '2rem 1.75rem',
      border: '1px solid #f1f5f9',
      boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06)',
      transition: 'box-shadow 0.2s'
    },
    valueIcon: (color, light) => ({
      width: '52px',
      height: '52px',
      background: light,
      color,
      borderRadius: '14px',
      marginBottom: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 700
    }),
    valueTitle: {
      margin: '0 0 0.4rem',
      fontSize: '16px',
      fontWeight: 700,
      color: '#0f172a'
    },
    valueDesc: {
      margin: 0,
      fontSize: '13px',
      color: '#64748b',
      lineHeight: 1.6
    },
    toolsSection: {
      padding: '1rem 2rem 5rem',
      background: 'white',
      marginBottom: '2rem'
    },
    toolsInner: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    toolsHeading: {
      fontSize: '30px',
      fontWeight: 800,
      margin: '0 0 2.5rem',
      color: '#0f172a',
      textAlign: 'center',
      letterSpacing: '-0.5px'
    },
    categoryGroup: {
      marginBottom: '3.5rem'
    },
    categoryHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      paddingBottom: '14px',
      borderBottom: '1px solid #f1f5f9',
      marginBottom: '1.5rem'
    },
    categoryEmoji: {
      fontSize: '22px'
    },
    categoryName: {
      margin: 0,
      fontSize: '16px',
      fontWeight: 700,
      color: '#0f172a'
    },
    categoryCount: {
      marginLeft: '4px',
      padding: '2px 9px',
      background: '#f1f5f9',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 600,
      color: '#64748b'
    },
    toolGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
      gap: '10px',
      marginBottom: '1.5rem'
    },
    toolCard: (colors) => ({
      background: colors.light,
      borderRadius: '12px',
      padding: '1.1rem',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '12px',
      border: '1px solid transparent',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }),
    toolEmoji: {
      width: '40px',
      height: '40px',
      flexShrink: 0,
      background: 'white',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.07)'
    },
    toolInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      minWidth: 0
    },
    toolName: {
      margin: 0,
      fontSize: '13px',
      fontWeight: 700,
      color: '#0f172a',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    toolDesc: {
      margin: 0,
      fontSize: '11px',
      color: '#64748b',
      lineHeight: 1.4,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    toolCta: (color) => ({
      marginTop: 'auto',
      fontSize: '12px',
      fontWeight: 700,
      color,
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }),
    showMoreBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 16px',
      background: '#f8fafc',
      color: '#475569',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '13px',
      transition: 'all 0.2s'
    },
    faqSection: {
      padding: '4rem 2rem',
      maxWidth: '760px',
      margin: '0 auto'
    },
    faqHeadingWrap: {
      textAlign: 'center',
      marginBottom: '2.5rem'
    },
    faqH2: {
      fontSize: '30px',
      fontWeight: 800,
      color: '#0f172a',
      marginBottom: '8px',
      letterSpacing: '-0.5px'
    },
    faqSub: {
      color: '#64748b',
      fontSize: '15px',
      margin: 0
    },
    faqItem: (isOpen) => ({
      background: 'white',
      border: isOpen ? '1px solid #cbd5e1' : '1px solid #f1f5f9',
      borderRadius: '14px',
      overflow: 'hidden',
      marginBottom: '10px',
      boxShadow: isOpen ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
      transition: 'all 0.2s'
    }),
    faqBtn: {
      width: '100%',
      padding: '1.1rem 1.5rem',
      background: 'transparent',
      border: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      textAlign: 'left',
      gap: '12px'
    },
    faqQuestion: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#0f172a',
      lineHeight: 1.4
    },
    faqChevron: (isOpen) => ({
      flexShrink: 0,
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      background: isOpen ? '#0f172a' : '#f1f5f9',
      color: isOpen ? 'white' : '#64748b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '13px',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'all 0.25s ease'
    }),
    faqAnswer: {
      padding: '0 1.5rem 1.25rem',
      color: '#475569',
      fontSize: '14px',
      lineHeight: 1.7
    },
    aboutSection: {
      padding: '2rem 2rem 4rem',
      maxWidth: '900px',
      margin: '0 auto'
    },
    aboutCard: {
      background: '#0f172a',
      borderRadius: '24px',
      padding: '3.5rem',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    aboutBadge: {
      display: 'inline-block',
      padding: '5px 14px',
      background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 600,
      color: 'rgba(255,255,255,0.7)',
      marginBottom: '1.25rem',
      letterSpacing: '0.5px',
      textTransform: 'uppercase'
    },
    aboutH2: {
      fontSize: '28px',
      fontWeight: 800,
      margin: '0 0 1.5rem',
      letterSpacing: '-0.5px'
    },
    aboutText: {
      fontSize: '15px',
      color: 'rgba(255,255,255,0.65)',
      lineHeight: 1.8,
      maxWidth: '600px',
      margin: '0 auto 1rem'
    },
    aboutButtons: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '2rem'
    },
    redditBtn: {
      padding: '12px 22px',
      background: 'rgba(255,69,0,0.12)',
      color: '#FF6534',
      border: '1px solid rgba(255,69,0,0.2)',
      borderRadius: '10px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 600,
      transition: 'all 0.2s'
    },
    ihBtn: {
      padding: '12px 22px',
      background: 'rgba(84,197,150,0.12)',
      color: '#54C596',
      border: '1px solid rgba(84,197,150,0.2)',
      borderRadius: '10px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 600,
      transition: 'all 0.2s'
    },
    footer: {
      background: 'white',
      borderTop: '1px solid #f1f5f9',
      padding: '3.5rem 2rem 2rem'
    },
    footerGrid: {
      maxWidth: '1100px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: '2.5rem',
      marginBottom: '3rem'
    },
    footerBrand: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 700,
      fontSize: '18px',
      color: '#0f172a',
      marginBottom: '0.75rem'
    },
    footerBrandLogo: {
      width: '30px',
      height: '30px',
      background: '#0f172a',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      color: 'white'
    },
    footerText: {
      fontSize: '13px',
      color: '#94a3b8',
      lineHeight: 1.6,
      margin: 0
    },
    footerColTitle: {
      fontSize: '14px',
      fontWeight: 700,
      color: '#0f172a',
      marginBottom: '1rem',
      marginTop: 0
    },
    footerLinks: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    footerLink: {
      color: '#64748b',
      textDecoration: 'none',
      fontSize: '13px',
      transition: 'color 0.2s'
    },
    footerBottom: {
      maxWidth: '1100px',
      margin: '0 auto',
      paddingTop: '1.5rem',
      borderTop: '1px solid #f1f5f9',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px',
      fontSize: '12px',
      color: '#94a3b8'
    }
  };

  return (
    <div style={styles.page}>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          <div style={styles.navLogo}>⌘</div>
          Tabutility
        </div>
        <div style={styles.navLinks}>
          <a href="#tools" style={styles.navLink} onMouseEnter={e => e.target.style.color='#0f172a'} onMouseLeave={e => e.target.style.color='#555'}>Tools</a>
          <a href="#faq" style={styles.navLink} onMouseEnter={e => e.target.style.color='#0f172a'} onMouseLeave={e => e.target.style.color='#555'}>FAQ</a>
          <a href="#about" style={styles.navLink} onMouseEnter={e => e.target.style.color='#0f172a'} onMouseLeave={e => e.target.style.color='#555'}>About</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>
          <span style={styles.heroDot}></span>
          FREE TOOLS, REAL PRIVACY
        </div>
        <h1 style={styles.heroH1}>
          Tools That Actually<br />
          <span style={styles.heroAccent}> Respect You</span>
        </h1>
        <p style={styles.heroSub}>
          No sign-up. No tracking. No BS. 13 free utilities built by a solo founder who actually cares about your privacy.
        </p>
        <div style={styles.heroCtas}>
          <a
            href="#tools"
            style={styles.ctaPrimary}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.28)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,23,42,0.2)'; }}
          >
            Explore Tools
          </a>
          <a
            href="#about"
            style={styles.ctaSecondary}
            onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
          >
            Read the Story
          </a>
        </div>
      </section>

      {/* ── AdSense Slot 1 (below hero) ──────────────────────────────
           When approved, replace this comment block with:
           <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true" />
      ──────────────────────────────────────────────────────────── */}

      {/* Value Props */}
      <section style={styles.valueSection}>
        <div style={styles.valueGrid}>
          {valueProps.map((prop, i) => (
            <div
              key={i}
              style={styles.valueCard}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 30px -4px rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(0,0,0,0.06)'}
            >
              <div style={styles.valueIcon(prop.color, prop.light)}>{prop.icon}</div>
              <h3 style={styles.valueTitle}>{prop.title}</h3>
              <p style={styles.valueDesc}>{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" style={styles.toolsSection}>
        <div style={styles.toolsInner}>
          <h2 style={styles.toolsHeading}>13 Tools, All Free.</h2>

          {Object.entries(toolsConfig.categories).map(([categoryKey, category]) => {
            const colors = colorMap[category.name] || { icon: '#4B7FED', border: '#4B7FED', light: '#EEF1FF' };
            const isExpanded = showMoreTools[categoryKey];
            const toolsToShow = isExpanded ? category.tools : category.tools.slice(0, 4);
            const hasMore = category.tools.length > 4;

            return (
              <div key={categoryKey} style={styles.categoryGroup}>
                <div style={styles.categoryHeader}>
                  <span style={styles.categoryEmoji}>{category.emoji}</span>
                  <h3 style={styles.categoryName}>{category.name}</h3>
                  <span style={styles.categoryCount}>{category.tools.length}</span>
                </div>

                <div style={styles.toolGrid}>
                  {toolsToShow.map((tool) => (
                    <a
                      key={tool.id}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.toolCard(colors)}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = '0 6px 20px -4px rgba(0,0,0,0.12)';
                        e.currentTarget.style.borderColor = colors.border + '50';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = '';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      <div style={styles.toolEmoji}>{tool.emoji}</div>
                      <div style={styles.toolInfo}>
                        <h4 style={styles.toolName}>{tool.name}</h4>
                        <p style={styles.toolDesc}>{tool.description}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {hasMore && !isExpanded && (
                  <button
                    onClick={() => setShowMoreTools({ ...showMoreTools, [categoryKey]: true })}
                    style={styles.showMoreBtn}
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

      {/* ── AdSense Slot 2 (between tools and FAQ) ───────────────────
           When approved, replace this comment block with:
           <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true" />
      ──────────────────────────────────────────────────────────── */}

      {/* FAQ */}
      <section id="faq" style={styles.faqSection}>
        <div style={styles.faqHeadingWrap}>
          <h2 style={styles.faqH2}>Questions?</h2>
          <p style={styles.faqSub}>Everything you need to know about Tabutility.</p>
        </div>

        {faqItems.map((item, idx) => {
          const isOpen = expandedFaq === idx;
          return (
            <div key={idx} style={styles.faqItem(isOpen)}>
              <button
                onClick={() => setExpandedFaq(isOpen ? null : idx)}
                style={styles.faqBtn}
              >
                <span style={styles.faqQuestion}>{item.q}</span>
                <span style={styles.faqChevron(isOpen)}>▼</span>
              </button>
              {isOpen && (
                <div style={styles.faqAnswer}>{item.a}</div>
              )}
            </div>
          );
        })}
      </section>

      {/* About */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutCard}>
          <div style={styles.aboutBadge}>The Founder Story</div>
          <h2 style={styles.aboutH2}>Why Tabutility Exists</h2>
          <p style={styles.aboutText}>
            I started Tabutility because I was frustrated. Most online tools are either outdated, bloated, or designed to extract money from you. As a non-technical founder, I decided to build something different — tools that are genuinely useful, completely free, and honest about how they work.
          </p>
          <p style={styles.aboutText}>
            Building in public means sharing everything: revenue, growth metrics, failures, and learnings. No PR spin. No polished narrative. Just real. This is a solo project, and I'm learning as I go. But every tool works, and every tool respects your privacy.
          </p>
          <div style={styles.aboutButtons}>
            <a
              href="https://reddit.com/r/webdev"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.redditBtn}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,69,0,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,69,0,0.12)'}
            >
              Follow on Reddit
            </a>
            <a
              href="https://indiehackers.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.ihBtn}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(84,197,150,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(84,197,150,0.12)'}
            >
              Indie Hackers
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <div style={styles.footerBrand}>
              <div style={styles.footerBrandLogo}>⌘</div>
              Tabutility
            </div>
            <p style={styles.footerText}>Free tools built by a solo founder. No tracking. No BS. Just tools that work.</p>
          </div>
          <div>
            <h4 style={styles.footerColTitle}>Legal</h4>
            <div style={styles.footerLinks}>
              <a href="/privacy" style={styles.footerLink} onMouseEnter={e => e.target.style.color='#0f172a'} onMouseLeave={e => e.target.style.color='#64748b'}>Privacy Policy</a>
              <a href="/terms" style={styles.footerLink} onMouseEnter={e => e.target.style.color='#0f172a'} onMouseLeave={e => e.target.style.color='#64748b'}>Terms of Service</a>
            </div>
          </div>
          <div>
            <h4 style={styles.footerColTitle}>Community</h4>
            <div style={styles.footerLinks}>
              <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" style={styles.footerLink} onMouseEnter={e => e.target.style.color='#0f172a'} onMouseLeave={e => e.target.style.color='#64748b'}>Reddit</a>
              <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer" style={styles.footerLink} onMouseEnter={e => e.target.style.color='#0f172a'} onMouseLeave={e => e.target.style.color='#64748b'}>Indie Hackers</a>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={{ margin: 0 }}>© 2026 Tabutility. Built with ❤️ in public. No venture capital. No exit strategy. Just tools that work.</p>
          <p style={{ margin: 0 }}>Designed for humans, not trackers.</p>
        </div>
      </footer>

    </div>
  );
}
