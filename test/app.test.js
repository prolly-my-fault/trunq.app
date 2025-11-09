const { test } = require('node:test');
const assert = require('node:assert');

test('app configuration is valid', () => {
  const pkg = require('../package.json');
  assert.ok(pkg.name, 'Package should have a name');
  assert.ok(pkg.version, 'Package should have a version');
});

test('basic math works', () => {
  assert.strictEqual(2 + 2, 4);
});
