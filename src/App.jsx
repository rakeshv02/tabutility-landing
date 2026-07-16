import toolsConfig from './tools.config.json'

export default function App() {
  const allTools = []
  Object.values(toolsConfig.categories).forEach(cat => {
    allTools.push(...cat.tools)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-white mb-4">Tabutility</h1>
          <p className="text-xl text-slate-400 mb-6">Free, fast, and reliable tools for developers and everyday users</p>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{allTools.length}</div>
              <div className="text-sm text-slate-400">Tools Live</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">100%</div>
              <div className="text-sm text-slate-400">Free Forever</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">
        <h2 className="text-2xl font-bold text-white mb-8">Available Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {allTools.map((tool) => (
            <a key={tool.id} href={tool.url} className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-blue-600 hover:shadow-xl hover:scale-105 transition-all group">
              <div className="mb-4 text-4xl">{tool.emoji}</div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition mb-2">{tool.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{tool.description}</p>
              <span className="inline-block text-xs px-2 py-1 bg-green-900 bg-opacity-50 text-green-300 rounded">Live</span>
            </a>
          ))}
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Coming Soon 🚀</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Loan Calculator', 'Unit Converter', 'Password Generator', 'QR Code Generator', 'Base64 Encoder', 'URL Encoder', 'Markdown to HTML', 'More Tools'].map((name, i) => (
              <div key={i} className="bg-slate-700 border border-slate-600 rounded p-4 text-center">
                <p className="text-slate-400 text-sm">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-800 border-t border-slate-700 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-400 text-sm">
          <p>Built by a solo founder. All tools are free and open to use.</p>
          <p className="mt-2">📧 Feedback? Let us know on Reddit or Twitter</p>
        </div>
      </div>

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7039091592734005" crossOrigin="anonymous"></script>
    </div>
  )
}
