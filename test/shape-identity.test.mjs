import assert from 'node:assert/strict';
import test from 'node:test';

/**
 * A shape's IRI is `{baseUri}shape/{packageSlug}/{ShapeName}`, and the slug
 * comes from whichever `linkedPackage()` the `@linkedShape` decorator was
 * bound to — not from the npm name in package.json. When `src/package.ts`
 * re-exported core's decorators, these shapes registered as
 * `shape/core/Ontology` and `shape/core/Restriction` while every other signal
 * in the repo said "owl". The IRI is persisted data and `Server.call` routes
 * on the package name inside it, so nothing in a type-check or a build can
 * catch this; only reading the id back off the built class can.
 *
 * Runs against `lib/`, deliberately: the decorator only runs at runtime, so
 * the compiled artifact is the only thing that can answer the question.
 */

const load = (path) => import(new URL(`../lib/esm/shapes/${path}`, import.meta.url));

test('Ontology registers under the owl slug, not core', async () => {
  const {Ontology} = await load('Ontology.js');
  assert.equal(Ontology.shape?.id, 'https://linked.cm/shape/owl/Ontology');
});

test('Restriction registers under the owl slug, not core', async () => {
  const {Restriction} = await load('Restriction.js');
  assert.equal(Restriction.shape?.id, 'https://linked.cm/shape/owl/Restriction');
});

test('property shapes inherit the owl slug', async () => {
  const {Restriction} = await load('Restriction.js');
  const propertyIds = (Restriction.shape?.propertyShapes ?? []).map((p) => p.id);
  assert.ok(propertyIds.length > 0, 'Restriction declares no property shapes');
  for (const id of propertyIds) {
    assert.ok(
      id.startsWith('https://linked.cm/shape/owl/Restriction/'),
      `property shape ${id} does not carry the owl slug`,
    );
  }
});
