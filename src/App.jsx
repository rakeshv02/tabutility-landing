import { useState } from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Tabutility</h1>
          <p className="text-gray-400 text-sm mt-1">Essential tools for productivity</p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Free Online Tools</h2>
          <p className="text-xl text-gray-400 mb-8">Simple, fast, and reliable utilities</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h4 className="text-2xl font-bold mb-3">Word Unscrambler</h4>
            <p className="text-gray-400 mb-4">Find all words from scrambled letters. Perfect for Scrabble and Wordle.</p>
            <a href="https://word-unscrambler.tabutility.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold">Open Tool →</a>
          </div>

          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h4 className="text-2xl font-bold mb-3">Uptime Monitor</h4>
            <p className="text-gray-400 mb-4">Monitor website health and get real-time uptime tracking.</p>
            <a href="https://uptime.tabutility.com" target="_blank" rel="noopener noreferrer" className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg font-semibold">Open Tool →</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p>© 2026 Tabutility. All tools are free.</p>
        </div>
      </footer>
    </div>
  );
}
