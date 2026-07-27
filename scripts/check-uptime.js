#!/usr/bin/env node
/**
 * check-uptime.js
 * Reads tools.config.json, HTTP-checks every URL, and writes results to
 * GitHub Actions outputs so the workflow can open/close issues.
 *
 * Output:
 *   failures  – JSON array of { id, url, status } for non-200 responses
 *               (empty string when all pass)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const TIMEOUT_MS = 15_000;
const CONCURRENCY = 10; // parallel requests at a time

// ── helpers ──────────────────────────────────────────────────────────────────

function checkUrl(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(
      url,
      {
        timeout: TIMEOUT_MS,
        headers: { 'User-Agent': 'tabutility-uptime-bot/1.0' },
      },
      (res) => {
        // Drain response body so the socket is released
        res.resume();
        resolve({ status: res.statusCode });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 'TIMEOUT' });
    });

    req.on('error', (err) => {
      resolve({ status: `ERROR: ${err.message}` });
    });
  });
}

async function runWithConcurrency(tasks, limit) {
  const results = [];
  const queue = [...tasks];

  async function worker() {
    while (queue.length > 0) {
      const task = queue.shift();
      results.push(await task());
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

function setOutput(name, value) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    // Multi-line safe: use heredoc delimiter for JSON arrays
    const delimiter = `ghadelimiter_${Math.random().toString(36).slice(2)}`;
    fs.appendFileSync(outputFile, `${name}<<${delimiter}\n${value}\n${delimiter}\n`);
  } else {
    // Local debug
    console.log(`OUTPUT ${name}=${value}`);
  }
}

// ── main ─────────────────────────────────────────────────────────────────────

(async () => {
  const configPath = path.join(__dirname, '..', 'tools.config.json');
  const tools = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log(`Checking ${tools.length} tools…`);

  const tasks = tools.map((tool) => async () => {
    const result = await checkUrl(tool.url);
    const ok = result.status === 200;
    console.log(`${ok ? '✅' : '❌'} [${result.status}] ${tool.url}`);
    return { id: tool.id, url: tool.url, status: result.status, ok };
  });

  const results = await runWithConcurrency(tasks, CONCURRENCY);

  const failures = results.filter((r) => !r.ok).map(({ id, url, status }) => ({ id, url, status }));

  if (failures.length === 0) {
    console.log('\n✅ All tools are up!');
    setOutput('failures', '');
  } else {
    console.log(`\n❌ ${failures.length} tool(s) failed:`);
    failures.forEach((f) => console.log(`  - ${f.id}: ${f.url} → ${f.status}`));
    setOutput('failures', JSON.stringify(failures));
  }

  // Exit 0 regardless so the workflow step succeeds and the reporting step runs
  process.exit(0);
})();
