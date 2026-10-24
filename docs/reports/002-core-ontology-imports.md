---
date: 2026-10-24
summary: >
  `NamedIndividual` imports `rdfs` from the vocabulary package (`@_linked/rdfs/ontologies/rdfs`,
  namespace import) instead of core's internal `@_linked/core/ontologies/rdfs`. No dependency
  change. Patch.
---

# 002 — rdfs from the vocabulary package

## Why

`@_linked/core/ontologies/rdfs` is core's internal module. The `rdfs` terms are published by the
vocabulary package `@_linked/rdfs` as a generated accessor module, which owl already depends on.

## What changed

- `src/shapes/NamedIndividual.ts`: `import { rdfs } from '@_linked/core/ontologies/rdfs'` →
  `import * as rdfs from '@_linked/rdfs/ontologies/rdfs'`. The terms it uses (`rdfs.label`,
  `rdfs.comment`) are exported by the generated module of the installed `@_linked/rdfs@1.4.0`, so
  the range ^1.4.0 stays; they stay accessor references.
- `.changeset/core-ontology-imports.md`: patch.
- `npm install` left the lockfile unchanged.
- The `shacl` imports in `Class.ts`, `Ontology.ts` and `ObjectProperty.ts` stay on core: no
  vocabulary package exists for shacl yet.
- A grep of `src`, `test` and scripts for `@_linked/core/ontologies/(xsd|rdf|rdfs|owl)`, static
  or dynamic, finds nothing else.

## Gate

- `npx linked build`: "✔ Checking ontology modules", "✔ Build successful".
- `npm test`: "# tests 5", "# pass 5", "# fail 0".

## PR

### Summary

`NamedIndividual` takes `rdfs:label` and `rdfs:comment` from the `@_linked/rdfs` vocabulary
package instead of core's internal ontology module.

### Changes

- `src/shapes/NamedIndividual.ts`: `import * as rdfs from '@_linked/rdfs/ontologies/rdfs'`.
- Patch changeset. No dependency change (`@_linked/rdfs` ^1.4.0 already exports both terms).

### Verification

- `npx linked build`: "✔ Checking ontology modules", "✔ Build successful".
- `npm test`: "# tests 5", "# pass 5", "# fail 0".

### Deviations

None.

### Follow-ups

- The `shacl` imports from `@_linked/core/ontologies/shacl` stay until a shacl vocabulary package
  is decided.
