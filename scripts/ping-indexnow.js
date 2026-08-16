#!/usr/bin/env node
/**
 * ping-indexnow.js — Submit new or updated URLs to IndexNow (Bing, Yandex, etc.)
 *
 * Usage:
 *   node scripts/ping-indexnow.js https://tabutility.com/diy-seo/ [more-urls...]
 *
 * Run this after deploying a new page or after making significant changes to an
 * existing page. The key file (7ab3df9c4e21056b8a7cd5e234f1b90a.txt) is already
 * hosted at https://tabutility.com/7ab3df9c4e21056b8a7cd5e234f1b90a.txt and
 * served correctly by the Vercel rewrite rules.
 *
 * Exit codes:
 *   0 — all URLs accepted (200) or already known (202)
 *   1 — one or more URLs rejected or network error
 */

const KEY = '7ab3df9c4e21056b8a7cd5e234f1b90a';
const HOST = 'tabutility.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// Default URLs to ping when called without arguments
const DEFAULT_URLS = [
  'https://tabutility.com/diy-seo/',
];

async function ping(urls) {
  if (!urls.length) {
    console.error('No URLs provided.');
    process.exit(1);
  }

  console.log(`Pinging IndexNow for ${urls.length} URL(s):`);
  urls.forEach(u => console.log('  •', u));

  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  });

  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
    });
  } catch (err) {
    console.error('Network error:', err.message);
    process.exit(1);
  }

  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow accepted (HTTP ${res.status}) — URLs queued for crawl.`);
    process.exit(0);
  } else {
    const text = await res.text().catch(() => '');
    console.error(`IndexNow rejected (HTTP ${res.status}): ${text.slice(0, 300)}`);
    process.exit(1);
  }
}

const cliUrls = process.argv.slice(2).filter(a => a.startsWith('http'));
ping(cliUrls.length ? cliUrls : DEFAULT_URLS);
