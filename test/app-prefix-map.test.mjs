// Runs against the built lib: `linked build && npm test`.
//
// The package registers no prefix: `Ontology.prefix` reads the app's prefix map, which this test
// loads itself, as an app does at start.
import assert from 'node:assert/strict';
import test from 'node:test';
import { Prefix } from '@_linked/core/utils/Prefix';
import '../lib/esm/index.js';

const { Ontology } = await import(new URL('../lib/esm/shapes/Ontology.js', import.meta.url));
const OWL = 'http://www.w3.org/2002/07/owl#';
const prefixOf = (id) => Object.getOwnPropertyDescriptor(Ontology.prototype, 'prefix').get.call({ id });

test('loading the package adds no prefix for its namespace', () => {
  assert.equal(Prefix.getPrefix(OWL), undefined);
  assert.equal(prefixOf(OWL), undefined);
});

test("Ontology.prefix is the prefix the app's map gives the ontology", () => {
  Prefix.load({ owlx: OWL });
  assert.equal(prefixOf(OWL), 'owlx');
  assert.equal(Prefix.getPrefix(OWL, { owl: OWL }), 'owl');
});
