import assert from 'node:assert/strict';
import test from 'node:test';

/**
 * A named individual is read with its label, comment and types (an ontology's individuals
 * list shows all three), so the shape carries each one as a property shape: `label` and
 * `type` from `Shape`, `comment` declared on `NamedIndividual`.
 */
const {NamedIndividual} = await import(new URL('../lib/esm/shapes/NamedIndividual.js', import.meta.url));

const {getPropertyShapes} = await import('@_linked/core/shapes/nodeShapeData');

const pathOf = (label) => {
  const p = getPropertyShapes(NamedIndividual.shape, true).find((s) => s.label === label);
  return p?.path?.id ?? p?.path?.[0]?.id ?? p?.path;
};

test('NamedIndividual reads rdfs:label, rdfs:comment and rdf:type', () => {
  assert.equal(pathOf('label'), 'http://www.w3.org/2000/01/rdf-schema#label');
  assert.equal(pathOf('comment'), 'http://www.w3.org/2000/01/rdf-schema#comment');
  assert.equal(pathOf('type'), 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
});
