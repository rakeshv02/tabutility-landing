# Tabutility Design Language

One brand across tabutility.com, all `/public` content pages, and the 143 tool subdomains.
The shared tokens live in `public/styles/tabutility.css` (also served at `https://tabutility.com/styles/tabutility.css`).

## The rule of two surfaces

| Surface | Theme | Used by |
|---|---|---|
| **Content pages** (blog, /tools/, salary & tax pages, hubs, reports, /embed/) | **Light** body + **navy** header/hero/footer | everything in this repo's `public/` |
| **Apps & widgets** (tool subdomains, embeddable widgets like `/widget/`) | **Dark** slate | {tool-id}.tabutility.com, iframe widgets |

Long-form articles stay light for readability; interactive tools stay dark. Both share the same navy family, indigo accent, and font stack, so they read as one brand.

## Tokens

### Font
```
font-family:'Segoe UI',system-ui,Arial,sans-serif
```
Code/monospace: `'Courier New',monospace`.

### Navy family (headers, heroes, footers — both themes)
- Nav + footer background: `#1a1a2e`
- Hero gradient: `linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)` (short version `#1a1a2e → #16213e` is fine for small heroes)
- Text on navy: brand/headings `#fff`, subtitle `#a5b4fc`, links/muted `#94a3b8`, faint `#64748b`

### Accent — indigo
- Primary: `#4f46e5` (buttons, links, active states, tags)
- Hover/darker: `#4338ca`
- Soft/on-dark: `#818cf8` · tint `#e0e7ff`
- Focus ring: `box-shadow:0 0 0 3px rgba(79,70,229,.12)`
- Button text on indigo is always `#fff`
- CTA gradient (the one sanctioned use of violet, used on CTA panels sitewide): `linear-gradient(135deg,#4f46e5,#7c3aed)`

### Light theme (content pages)
- Page background `#f8fafc` (alt wells/inputs `#f1f5f9`)
- Card: `background:#fff`, `border:1px solid #e2e8f0` (1.5px on hover-able cards), `border-radius:12–14px`
- Text: headings `#0f172a`, body `#334155` (or `#1e293b`), secondary `#475569`, muted `#64748b`, faint `#94a3b8`
- Card hover: `border-color:#4f46e5; box-shadow:0 4px 20px rgba(79,70,229,.1)`

### Dark theme (tools + widgets)
- Page background `#0f172a`, panel/nav `#1e293b`, border `#334155`
- Text: headings `#f1f5f9`, body `#cbd5e1`, muted `#94a3b8`, faint `#64748b`
- Links `#818cf8`; buttons `#4f46e5` with `#fff` text; input focus border `#818cf8`

### Status colors (both themes)
- Success: `#16a34a` on light / `#34d399` on dark (tints `#f0fdf4` / `#dcfce7`, border `#bbf7d0`)
- Warning: `#f59e0b` (tint `#fef3c7`); warn boxes on light pages: bg `#fff7ed`, border `#fed7aa`, strong text `#c2410c`
- Info tint: `#eff6ff`

## Using the tokens
Every content page must load the shared token sheet in `<head>`, before its page CSS:
```html
<link rel="stylesheet" href="/styles/tabutility.css">
```
Page CSS should reference tokens as `var(--tab-accent,#4f46e5)` (var + literal fallback) rather than repeating raw hex values, so a palette change in `tabutility.css` propagates. The salary/blog generators must emit this link on every new page.

## Header + footer pattern (content pages)
```html
<nav>
  <a href="https://tabutility.com" class="nav-brand">⚡ Tabutility</a>
  <div class="nav-links"><a href="https://tabutility.com">All Tools</a><a href="https://tabutility.com/blog/">Blog</a></div>
</nav>
...
<footer>© 2026 Tabutility · <a href="https://tabutility.com">All 143 free tools</a> · …page-specific disclaimer…</footer>
```
Nav: `background:#1a1a2e;padding:14px 20px`, brand `#fff` 18px/800, links `#94a3b8` 13px/600 (hover `#fff`).
Footer: `background:#1a1a2e;color:#64748b;text-align:center;padding:24px 20px;font-size:13px`, links `#94a3b8`.

## Don'ts
- No sky-blue accents (`#38bdf8`, `#0ea5e9`, `#7dd3fc`) — legacy palette, replaced by indigo.
- No `system-ui`-first font stacks — Segoe UI leads.
- Don't put dark slate panels on content pages or white cards inside tools.
