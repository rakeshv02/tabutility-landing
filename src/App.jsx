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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-gray-100">
      {/* Navigation */}
      <nav className="bg-slate-900/50 border-b border-blue-500/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Tabutility
          </h1>
          <div className="flex gap-4">
            <a href="#about" className="hover:text-blue-400 transition">About</a>
            <a href="#faq" className="hover:text-blue-400 transition">FAQ</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 max-w-6xl mx-auto">
        <div className="text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
            <span className="text-blue-400 text-sm font-semibold">✨ Building in Public</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Free Tools for <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Developers</span> & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Creators</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            No sign-up. No tracking. No BS. 13 powerful utilities built by a solo founder who actually cares about your privacy.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 mt-12 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-400">13</div>
              <div className="text-xs md:text-sm text-gray-400 mt-2">Tools Live</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">100%</div>
              <div className="text-xs md:text-sm text-gray-400 mt-2">Free Forever</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400">0</div>
              <div className="text-xs md:text-sm text-gray-400 mt-2">Sign-ups</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 py-16 md:py-20 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-y border-blue-500/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What is Tabutility?</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Tabutility started as a simple idea: build tools that solve real problems without the bloat, paywalls, and surveillance that comes with modern software.
            </p>
            <p>
              Every tool here runs in your browser. Nothing leaves your device without permission. No accounts. No tracking. No creepy data collection. Just simple, useful utilities.
            </p>
            <p>
              We're building in public on Reddit and Indie Hackers. Follow along as we launch new tools, share revenue numbers, and talk about what works (and what doesn't).
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="px-4 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          {Object.entries(toolsConfig.categories).map(([categoryKey, category]) => (
            <div key={categoryKey} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{category.emoji}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{category.name}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-br from-slate-800/80 to-slate-700/50 border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/50 hover:from-slate-800 hover:to-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{tool.emoji}</span>
                      <span className="px-3 py-1 bg-gradient-to-r from-green-900/40 to-green-900/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">Live</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition">{tool.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{tool.description}</p>
                    <span className="text-blue-400 text-sm font-semibold group-hover:text-cyan-400 transition">Open Tool →</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 md:py-20 bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-y border-purple-500/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">1</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Pick a Tool</h3>
                <p className="text-gray-400">Choose any tool. No account needed. No email required.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">2</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Use It Instantly</h3>
                <p className="text-gray-400">Start using it right away. All tools run in your browser—no server needed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">3</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Upgrade (Optional)</h3>
                <p className="text-gray-400">Some tools offer premium features. Free tier is always fully functional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Questions?</h2>
          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border border-blue-500/20 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 hover:border-blue-500/40 transition">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors text-left"
                >
                  <span className="font-semibold text-white">{item.q}</span>
                  <span className={`text-blue-400 text-2xl leading-none transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 border-t border-blue-500/20 text-gray-300 bg-slate-900/50">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Building in Public */}
      <section className="px-4 py-16 md:py-20 bg-gradient-to-b from-blue-900/20 to-slate-900 border-t border-blue-500/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Follow the Journey</h2>
          <p className="text-gray-300 mb-8">
            We're building Tabutility in the open. Join the community to see what's coming next, share feedback, and help shape the future of these tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://reddit.com/r/webdev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
            >
              Follow on Reddit
            </a>
            <a
              href="https://indiehackers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
            >
              Indie Hackers
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 border-t border-blue-500/20 bg-slate-900/80">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Tabutility</h3>
              <p className="text-sm text-gray-400">Free tools built by a solo founder. No tracking. No BS.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-blue-400 transition">Terms of Service</a></li>
                <li><a href="/about" className="hover:text-blue-400 transition">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://reddit.com" className="hover:text-blue-400 transition" target="_blank" rel="noopener noreferrer">Reddit</a></li>
                <li><a href="https://indiehackers.com" className="hover:text-blue-400 transition" target="_blank" rel="noopener noreferrer">Indie Hackers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Feedback</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-500/20 pt-8 text-center text-sm text-gray-500">
            <p>© 2026 Tabutility. Built with ❤️ in public. No venture capital. No exit strategy. Just tools that work.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
