#!/usr/bin/env node
/**
 * scripts/update-count.cjs
 * Runs before every Vite build. Reads tools.config.json, counts the tools,
 * and patches every hardcoded number in index.html so the count never drifts.
 * Also updates public/tools/index.html if it exists.
 * (.cjs extension required because package.json has "type":"module")
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const configPath = path.join(root, 'tools.config.json');
const indexPath  = path.join(root, 'index.html');
const dirPath    = path.join(root, 'public', 'tools', 'index.html');

const tools = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const count = tools.length;

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // "141 free online utility tools", "141 free browser-based tools", "141 free browser tools"
  html = html.replace(/(\b)\d{3}( free (?:online utility tools?|browser[- ]?based[^"<]{0,30}tools?|browser tools?))/gi,
    (_, pre, post) => pre + count + post);

  // "Search 141 tools"
  html = html.replace(/(Search )\d{3}( tools)/gi,
    (_, pre, post) => pre + count + post);

  // ">141</span>" inside cat-count spans
  html = html.replace(/(>)\d{3}(<\/span>)/g,
    (_, pre, post) => pre + count + post);

  // "141 Free Online Tools", "141 Free Tools" in og/twitter titles
  html = html.replace(/(\b)\d{3}( Free (?:Online )?Tools?)/gi,
    (_, pre, post) => pre + count + post);

  // "141 free browser tools. No sign-up" in body text
  html = html.replace(/(\b)\d{3}( free browser tools)/gi,
    (_, pre, post) => pre + count + post);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('[update-count] ' + path.relative(root, filePath) + ' -> ' + count + ' tools');
}

patchFile(indexPath);
patchFile(dirPath);

// ---------------------------------------------------------------------------
// Static crawlable links: regenerate the block between STATIC-LINKS markers in
// index.html from tools.config.json so crawlers that don't run JS see real
// <a href> links to every tool, the /tools/ directory, country hubs and blog.
// React hydrates into #root and CSS hides #static-shell, so no duplication.
// ---------------------------------------------------------------------------
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildStaticLinks() {
  const hubs = [
    ['/tools/', 'All Tools Directory'],
    ['/blog/', 'Blog & Guides'],
    ['/uk-tools/', 'UK Tools'],
    ['/us-tools/', 'US Tools'],
    ['/au-tools/', 'Australia Tools'],
    ['/uk-tax/', 'UK Tax Hub'],
    ['/us-tax/', 'US Tax Hub'],
    ['/australia-tax/', 'Australia Tax Hub'],
    ['/uk-salary/', 'UK Salary Guides'],
  ];
  const hubHtml = '<nav class="s-hub-row" aria-label="Site sections">' +
    hubs.map(([href, label]) => '<a href="' + href + '">' + esc(label) + '</a>').join('') +
    '</nav>';

  const byCat = {};
  for (const t of tools) (byCat[t.category] = byCat[t.category] || []).push(t);

  const sections = Object.keys(byCat).sort((a, b) => byCat[b].length - byCat[a].length).map(cat => {
    const cards = byCat[cat].map(t =>
      '<a class="s-link-card" href="' + t.url + '/"><strong>' + esc(t.emoji ? t.emoji + ' ' + t.name : t.name) + '</strong><span>' + esc(t.description || '') + '</span></a>'
    ).join('\n            ');
    return '<section class="s-links"><h2>' + esc(cat) + ' (' + byCat[cat].length + ')</h2><div class="s-link-grid">\n            ' + cards + '\n          </div></section>';
  }).join('\n          ');

  return hubHtml + '\n          ' + sections;
}

function patchStaticLinks(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  const start = '<!-- STATIC-LINKS:START -->';
  const end = '<!-- STATIC-LINKS:END -->';
  const i = html.indexOf(start), j = html.indexOf(end);
  if (i === -1 || j === -1) { console.log('[update-count] no STATIC-LINKS markers in ' + path.relative(root, filePath)); return; }
  html = html.slice(0, i + start.length) + '\n          ' + buildStaticLinks() + '\n          ' + html.slice(j);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('[update-count] static links regenerated in ' + path.relative(root, filePath) + ' (' + tools.length + ' tools)');
}

patchStaticLinks(indexPath);

console.log('[update-count] Done. Tool count: ' + count);
