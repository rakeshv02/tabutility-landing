#!/usr/bin/env node
/**
 * scripts/update-count.js
 * Runs before every Vite build. Reads tools.config.json, counts the tools,
 * and patches every hardcoded number in index.html so the count never drifts.
 * Also updates public/tools/index.html if it exists.
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
console.log('[update-count] Done. Tool count: ' + count);
