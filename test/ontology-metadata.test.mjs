// Runs against the built lib: `linked build && npm test`.
import assert from 'node:assert/strict';
import test from 'node:test';

/**
 * An ontology's metadata is read through `Ontology`'s accessors: its title and description
 * (Dublin Core terms), its preferred prefix and namespace (VANN, literals), its creator,
 * contributors and maintainers (IRIs), and its status (`adms:status`, one IRI).
 */
const {Ontology} = await import(new URL('../lib/esm/shapes/Ontology.js', import.meta.url));
const {getPropertyShapes} = await import('@_linked/core/shapes/nodeShapeData');

const SH = 'http://www.w3.org/ns/shacl#';
const DCT = 'http://purl.org/dc/terms/';
const VANN = 'http://purl.org/vocab/vann/';

const expected = [
  ['title', `${DCT}title`, 'Literal', 1],
  ['description', `${DCT}description`, 'Literal', 1],
  ['preferredNamespacePrefix', `${VANN}preferredNamespacePrefix`, 'Literal', 1],
  ['preferredNamespaceUri', `${VANN}preferredNamespaceUri`, 'Literal', 1],
  ['creator', `${DCT}creator`, 'IRI', 1],
  ['contributor', `${DCT}contributor`, 'IRI', undefined],
  ['maintainer', 'http://schema.org/maintainer', 'IRI', undefined],
  ['status', 'http://www.w3.org/ns/adms#status', 'IRI', 1],
];

const byLabel = new Map(getPropertyShapes(Ontology.shape, true).map((p) => [p.label, p]));

for (const [label, path, kind, maxCount] of expected) {
  test(`Ontology.${label} reads ${path}, ${kind}, ${maxCount === 1 ? 'one value' : 'any number'}`, () => {
    const p = byLabel.get(label);
    assert.ok(p, `no property shape ${label}`);
    assert.equal(p.path?.id, path);
    assert.equal(p.nodeKind?.id, `${SH}${kind}`);
    assert.equal(p.maxCount, maxCount);
  });
}

test('the SHACL prefix accessors keep their own names', () => {
  assert.equal(byLabel.get('declaredPrefix')?.path?.id, `${SH}prefix`);
  assert.equal(byLabel.has('prefix'), false);
});
