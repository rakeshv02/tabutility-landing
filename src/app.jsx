import { useState } from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Tabutility
          </h1>
          <p className="text-gray-400 text-sm mt-1">Essential tools for productivity & monitoring</p>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Free Online Tools</h2>
          <p className="text-xl text-gray-400 mb-8">Simple, fast, and reliable utilities designed to save you time</p>
          <p className="text-gray-500">No sign-up required. No ads interrupting. Just tools that work.</p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-12 text-center">Our Tools</h3>
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Tool 1: Word Unscrambler */}
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-blue-500 transition">
            <div className="mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-xl font-bold">
                🔤
              </div>
            </div>
            <h4 className="text-2xl font-bold mb-3">Word Unscrambler</h4>
            <p className="text-gray-400 mb-4">
              Enter scrambled letters and instantly discover all possible words. Perfect for Scrabble, Wordle, and word games.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://word-unscrambler.tabutility.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition"
              >
                Open Tool →
              </a>
              <span className="text-gray-500 text-sm">Free</span>
            </div>
          </div>

          {/* Tool 2: Uptime Monitor */}
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-cyan-500 transition">
            <div className="mb-4">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center text-xl font-bold">
                📊
              </div>
            </div>
            <h4 className="text-2xl font-bold mb-3">Uptime Monitor</h4>
            <p className="text-gray-400 mb-4">
              Monitor your website or service health. Get real-time uptime tracking and instant notifications when something goes down.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://uptime.tabutility.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg font-semibold transition"
              >
                Open Tool →
              </a>
              <span className="text-gray-500 text-sm">Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Banner Placeholder */}
      {/* 
      <section className="max-w-6xl mx-auto px-4 py-8 mt-8">
        <div className="bg-slate-800 rounded-xl p-6 text-center text-gray-400 border border-slate-700">
          Google AdSense Banner (728x90) - Replace this with your ad code after approval
        </div>
      </section>
      */}

      {/* Coming Soon */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold mb-8 text-center">Coming Soon</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {['Case Converter', 'Base64 Encoder', 'JSON Formatter'].map((tool, i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-6
