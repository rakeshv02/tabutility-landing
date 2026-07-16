import toolsConfig from './tools.config.json'

export default function App() {
  const allTools = []
  Object.values(toolsConfig.categories).forEach(cat => {
    allTools.push(...cat.tools)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-white mb-2">Tabutility</h1>
          <p className="text-slate-400">Simple, fast, and reliable utilities</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allTools.map((tool) => (
            <a key={tool.id} href={tool.url} className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-blue-600 hover:shadow-lg transition group">
              <div className="mb-4">
                <span className="text-4xl">{tool.emoji}</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition mb-2">{tool.name}</h3>
              <p className="text-slate-400 text-sm">{tool.description}</p>
            </a>
          ))}
        </div>
      </div>

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7039091592734005" crossOrigin="anonymous"></script>
    </div>
  )
}
