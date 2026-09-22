import test from 'node:test';
import assert from 'node:assert/strict';

// Run against the development server: node --test tests/scene-dependencies.test.mjs
// Guards the actual failure: the scene entry returned 200 while Drei returned 504.
test('the lazy scene and its optimized dependencies can all be loaded', async () => {
  const origin = process.env.VYNEX_TEST_URL || 'http://localhost:4173';
  const scene = await fetch(`${origin}/src/three/VynexScene.tsx`);
  assert.equal(scene.status, 200, 'scene module must load');
  const source = await scene.text();
  const paths = [...source.matchAll(/from "([^\"]+)"/g)]
    .map(match => match[1]).filter(path => path.startsWith('/node_modules/.vite/deps/'));
  assert.ok(paths.length > 0, 'test must inspect real Vite dependency URLs');
  for (const path of new Set(paths)) {
    const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, `${path}: ${response.status} ${response.statusText}`);
    await response.arrayBuffer();
  }
});
