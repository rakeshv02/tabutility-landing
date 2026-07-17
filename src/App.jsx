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
    'Text & Coding Tools': { icon: '#4B7FED', light: '#EEF1FF' },
    'Developer Utilities':  { icon: '#FF7A3B', light: '#FFF4EE' },
    'Developer Tools':      { icon: '#FF7A3B', light: '#FFF4EE' },
    'General Utilities':    { icon: '#27C281', light: '#EEFBF5' },
    'Image Tools':          { icon: '#9B6EDE', light: '#F7F1FF' },
    'Calculators':          { icon: '#FFB84D', light: '#FFFBF0' },
    'Content Tools':        { icon: '#FF6B9D', light: '#FFE8F5' },
  };

  const valueProps = [
    { title: 'Private by Default', desc: 'All processing in your browser. Your data never leaves your device.', color: '#27C281', light: '#EEFBF5', icon: '🔒' },
    { title: '100% Free',          desc: '10 utilities forever free. Premium features optional.',              color: '#4B7FED', light: '#EEF1FF', icon: '✓'  },
    { title: 'No Sign-up',         desc: 'Start instantly. No email, no account, no questions.',               color: '#FF7A3B', light: '#FFF4EE', icon: '→'  },
    { title: 'Built in Public',    desc: 'Follow the journey. See revenue, wins, and real numbers.',           color: '#9B6EDE', light: '#F7F1FF', icon: '🏗️' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-slate-900" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* ── Nav ── */}
      <nav className={`sticky top-0 z-50 flex items-center justify-between px-6 transition-all duration-300 ${scrolled ? 'py-3 bg-[#f8f7f4]/90 backdrop-blur-md shadow-sm border-b border-black/5' : 'py-5 bg-transparent border-b border-transparent'}`}>
        <div className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <div className="w-9 h-9 bg-slate-900 text-white rounded-xl flex items-center justify-center text-lg">⌘</div>
          Tabutility
        </div>
        <div className="flex items-center gap-8 text-sm font-medium">
          <a href="#tools" className="text-slate-500 hover:text-slate-900 transition-colors">Tools</a>
          <a href="#faq"   className="text-slate-500 hover:text-slate-900 transition-colors">FAQ</a>
          <a href="#about" className="text-slate-500 hover:text-slate-900 transition-colors">About</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/8 text-xs font-bold tracking-widest text-slate-500 uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          Free Tools, Real Privacy
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
          Tools That Actually<br />
          <span className="text-[#4B7FED]"> Respect You</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed mb-10">
          No sign-up. No tracking. No BS. 13 free utilities built by a solo founder who actually cares about your privacy.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="#tools" className="px-7 py-3.5 bg-slate-900 text-white rounded-xl font-semibold text-sm shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 hover:shadow-xl transition-all">
            Explore Tools
          </a>
          <a href="#about" className="px-7 py-3.5 bg-white text-slate-700 rounded-xl font-semibold text-sm border border-slate-200 shadow-sm hover:bg-slate-50 transition-all">
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
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {valueProps.map((prop, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold mb-5" style={{ background: prop.light, color: prop.color }}>
                {prop.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5">{prop.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tools ── */}
      <section id="tools" className="bg-white py-16 mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center tracking-tight mb-2">13 Tools, All Free.</h2>
          <p className="text-center text-slate-500 mb-12">Everything you need to get things done quickly. Click a tool to launch it instantly in your browser.</p>

          {Object.entries(toolsConfig.categories).map(([categoryKey, category]) => {
            const colors = colorMap[category.name] || { icon: '#4B7FED', light: '#EEF1FF' };
            const isExpanded = showMoreTools[categoryKey];
            const toolsToShow = isExpanded ? category.tools : category.tools.slice(0, 4);
            const hasMore = category.tools.length > 4;

            return (
              <div key={categoryKey} className="mb-12">
                {/* Category header */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-5">
                  <span className="text-2xl">{category.emoji}</span>
                  <h3 className="font-bold text-slate-900 text-lg">{category.name}</h3>
                  <span className="ml-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">{category.tools.length}</span>
                </div>

                {/* Tool grid — always 2 cols on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                  {toolsToShow.map((tool) => (
                    <a
                      key={tool.id}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-2xl p-5 border border-transparent hover:border-slate-200 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all"
                      style={{ background: colors.light, textDecoration: 'none' }}
                    >
                      <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm mb-3">
                        {tool.emoji}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{tool.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed flex-1">{tool.description}</p>
                      <div className="mt-3 text-xs font-bold" style={{ color: colors.icon }}>Open →</div>
                    </a>
                  ))}
                </div>

                {hasMore && !isExpanded && (
                  <button
                    onClick={() => setShowMoreTools({ ...showMoreTools, [categoryKey]: true })}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    See {category.tools.length - 4} more ▾
                  </button>
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
      <section id="faq" className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Questions?</h2>
          <p className="text-slate-500">Everything you need to know about Tabutility.</p>
        </div>
        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div key={idx} className={`bg-white rounded-2xl border overflow-hidden transition-all ${isOpen ? 'border-slate-300 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}>
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="font-semibold text-slate-900">{item.q}</span>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${isOpen ? 'bg-slate-900 text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>▼</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">{item.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/5 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="inline-block px-4 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-semibold text-white/60 uppercase tracking-widest mb-5">The Founder Story</div>
            <h2 className="text-3xl font-extrabold mb-6 tracking-tight">Why Tabutility Exists</h2>
            <div className="max-w-xl mx-auto space-y-4 text-slate-400 text-base leading-relaxed mb-8">
              <p>I started Tabutility because I was frustrated. Most online tools are either outdated, bloated, or designed to extract money from you. As a non-technical founder, I decided to build something different — tools that are genuinely useful, completely free, and honest about how they work.</p>
              <p>Building in public means sharing everything: revenue, growth metrics, failures, and learnings. No PR spin. No polished narrative. Just real.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="https://reddit.com/r/webdev" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors" style={{ background: 'rgba(255,69,0,0.12)', color: '#FF6534', border: '1px solid rgba(255,69,0,0.2)' }}>
                Follow on Reddit
              </a>
              <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors" style={{ background: 'rgba(84,197,150,0.12)', color: '#54C596', border: '1px solid rgba(84,197,150,0.2)' }}>
                Indie Hackers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-slate-100 py-14 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-slate-900 mb-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">⌘</div>
              Tabutility
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">Free tools built by a solo founder. No tracking. No BS. Just tools that work.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <a href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="/terms"   className="hover:text-slate-900 transition-colors">Terms of Service</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Community</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Reddit</a>
              <a href="https://indiehackers.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Indie Hackers</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-slate-100 flex flex-wrap justify-between gap-2 text-xs text-slate-400">
          <p>© 2026 Tabutility. Built with ❤️ in public. No venture capital. No exit strategy. Just tools that work.</p>
          <p>Designed for humans, not trackers.</p>
        </div>
      </footer>

    </div>
  );
}
