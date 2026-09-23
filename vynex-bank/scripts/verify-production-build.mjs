import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Read-only verification: never copy source HTML over Vite's generated entry.
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const html = readFileSync(path.join(dist, 'index.html'), 'utf8');
assert.ok(!/\/src\/|main\.tsx/.test(html), 'Production HTML must not load source modules');
const entry = html.match(/<script\b[^>]*\bsrc="(\/assets\/index-[^"/]+\.js)"/)?.[1];
assert.ok(entry, 'Production HTML must load a hashed Vite JavaScript bundle');
for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
  const file = path.join(dist, url.split(/[?#]/)[0].slice(1));
  assert.ok(existsSync(file) && statSync(file).isFile(), `Missing HTML dependency: ${url}`);
}
function verifyAssets(directory, relative = '') {
  for (const item of readdirSync(directory, {withFileTypes: true})) {
    const name = path.join(relative, item.name);
    if (item.isDirectory()) verifyAssets(path.join(directory, item.name), name);
    else {
      const source = readFileSync(path.join(directory, item.name));
      const target = path.join(dist, 'assets', name);
      assert.ok(existsSync(target), `Missing public asset: ${name}`);
      assert.ok(source.equals(readFileSync(target)), `Public asset changed during build: ${name}`);
    }
  }
}
verifyAssets(path.join(root, 'public', 'assets'));
for (const name of ['src', 'client', 'server', '.openai']) {
  assert.ok(!existsSync(path.join(dist, name)), `Unexpected production directory: ${name}`);
}
console.log(`Verified dist/index.html -> ${entry}`);
console.log('All HTML dependencies and public assets exist; no source modules or Sites worker output.');
