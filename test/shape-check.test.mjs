// Runs against the built lib: `linked build && npm test`.
//
// The shape check (`@_linked/core/shapes/checkShapeHierarchy`) holds this package to the rules
// every package that mirrors a published standard follows: each shape's `extends` agrees with
// the class hierarchy in `src/data/owl.ttl`, each shape owns the class it targets, and no shape
// or exported term uses an `owl:` IRI that OWL does not define.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { checkShapeHierarchy } from '@_linked/core/shapes/checkShapeHierarchy';
import '../lib/esm/shapes/index.js';
import '../lib/esm/ontologies/owl.register.js';
// rdfs's data defines the rdf/rdfs terms owl's shapes use (NamedIndividual's rdfs:comment).
import '@_linked/rdfs/ontologies/rdf.register.js';
import '@_linked/rdfs/ontologies/rdfs.register.js';
// dcmi's data defines the Dublin Core terms Ontology's title, description, creator and
// contributor use, so the check holds them to dcmi's mirror.
import '@_linked/dcmi/ontologies/dcterms.register.js';
import { packageName } from '../lib/esm/package.js';

const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const MIRRORS = ['http://www.w3.org/2002/07/owl#'];
const ownShape = (iri) => typeof iri === 'string' && iri.includes('/shape/owl/');

describe('shape check', () => {
  it("finds nothing in this package's shapes or in the namespace it mirrors", async () => {
    const findings = await checkShapeHierarchy({
      dependencies: {
        [packageName]: [
          ...Object.keys(manifest.dependencies ?? {}),
          ...Object.keys(manifest.peerDependencies ?? {}),
        ],
      },
    });
    const ours = findings.filter(
      (f) =>
        ownShape(f.shape) ||
        (f.kind === 'mirror-undefined-term' && MIRRORS.some((ns) => f.iri?.startsWith(ns))),
    );
    assert.deepEqual(
      ours.map((f) => `${f.severity} ${f.kind}: ${f.message}`),
      [],
    );
  });
});
