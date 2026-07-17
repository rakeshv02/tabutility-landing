export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">About Tabutility</h1>
        <p className="text-gray-400 mb-12">Built by a solo founder. Building in public.</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">The Mission</h2>
            <p>
              Tabutility exists to solve a simple problem: most online tools are either outdated, bloated, or designed to extract money from you. We're doing something different.
            </p>
            <p className="mt-4">
              Every tool here is:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li><strong>Free forever</strong> — No hidden paywalls, no premium tiers to unlock basic features</li>
              <li><strong>Private by default</strong> — All processing happens in your browser. Your data never leaves your device</li>
              <li><strong>No tracking</strong> — We don't follow you around the web. No creepy analytics</li>
              <li><strong>Actually useful</strong> — Each tool solves a real problem, not an imaginary one</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">The Story</h2>
            <p>
              I started Tabutility because I was frustrated. I'd find a useful tool, bookmark it, then months later it would be paywalled or abandoned. Meanwhile, I'd find better alternatives, but they all wanted my email or my data or both.
            </p>
            <p className="mt-4">
              As a non-technical founder, I decided to build tools anyway. Not to get rich (that's not realistic), but to prove that you can build something useful, keep it free, and respect your users. Building in public means sharing the numbers, the failures, and the successes. No PR, no polished narrative. Just real.
            </p>
            <p className="mt-4">
              This is a solo project. I'm learning as I go. The first tools are simple because I'm not a coder. But they work, they're useful, and they're honest.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Why Build This Way?</h2>
            <p>
              Most SaaS companies treat users as revenue. We're different. Our revenue comes from optional subscriptions (for power users) and non-intrusive ads. No tracking. No selling your data. Just tools that work.
            </p>
            <p className="mt-4">
              By building in public, I'm holding myself accountable. You'll see our metrics, our mistakes, and our wins. This transparency builds trust. And trust is what's missing from the internet right now.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What's Next?</h2>
            <p>
              Right now, we're launching 10+ free utility tools. By Month 2, we'll add specialized tools for creators and small businesses. By Month 3, we'll share our revenue numbers publicly and discuss what's working.
            </p>
            <p className="mt-4">
              The long-term vision: build a suite of tools so good and so trustworthy that people recommend them without being asked.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Join the Journey</h2>
            <p>
              We're building Tabutility in public. That means you can:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Watch us launch new tools</li>
              <li>Suggest features</li>
              <li>Share feedback (good or bad)</li>
              <li>See our revenue and growth metrics</li>
              <li>Be part of something honest</li>
            </ul>
            <p className="mt-4">
              Follow us on Reddit and Indie Hackers. Share your thoughts. Help us build something worth using.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Core Values</h2>
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold text-white">Privacy First</h3>
                <p className="text-gray-400">Your data is yours. We don't collect, store, or sell it.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Transparency</h3>
                <p className="text-gray-400">No hidden fees. No dark patterns. We tell you what we're doing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Simplicity</h3>
                <p className="text-gray-400">Tools that just work. No unnecessary complexity.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Accessibility</h3>
                <p className="text-gray-400">Free for everyone. Fast. Works on any device.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
            <p>
              Have questions? Found a bug? Want to collaborate? Reach out on Reddit or Twitter. I read every message and respond to most.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              No corporate email. No support bots. Just a solo founder who actually cares.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-gray-400 text-sm">
            Built with ❤️ by a solo founder. Building in public. No venture capital. No exit strategy. Just tools that work.
          </p>
        </div>
      </div>
    </div>
  );
}
