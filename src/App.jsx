import { useState, useEffect } from 'react'
import toolsConfig from './tools.config.json'

export default function App() {
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    const firstCat = Object.keys(toolsConfig.categories)[0]
    setActiveCategory(firstCat)
  }, [])

  const category = activeCategory ? toolsConfig.categories[activeCategory] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-white mb-2">Tabutility</h1>
          <p className="text-slate-400">Simple, fast, and reliable utilities</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {Object.entries(toolsConfig.categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                activeCategory === key ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {category && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.tools.map((tool) => (
              <a key={tool.id} href={tool.url} className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-blue-600 hover:shadow-lg transition group">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{tool.emoji}</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">{tool.name}</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4">{tool.description}</p>
                <span className="text-xs px-2 py-1 bg-green-900 bg-opacity-50 text-green-300 rounded">{tool.status}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7039091592734005" crossOrigin="anonymous"></script>
    </div>
  )
}
