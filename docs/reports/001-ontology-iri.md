---
date: 2026-10-24
summary: >
  `_ontologyResource` is the ontology IRI `http://www.w3.org/2002/07/owl` that the data declares with `owl:Ontology`,
  not the namespace `http://www.w3.org/2002/07/owl#`. Regenerated with `@_linked/cli` 1.57.1. Patch.
---

# 001 — The ontology IRI

## Why

`@_linked/cli` 1.57.1 (cli report 028) takes the generated `_ontologyResource` from the
subject the data types `owl:Ontology`. `src/data/owl.ttl` declares `<http://www.w3.org/2002/07/owl> a owl:Ontology`, the
official ontology IRI, without the namespace's `#` (owl 1.6.0's generated module had changed it to
the namespace; this restores the earlier value). With cli 1.57.1, `linked build` reported
the committed module stale:

```
owl: Out of date: src/ontologies/owl.data.ts. Run `linked generate-ontology`.
```

## What changed

- `src/ontologies/owl.data.ts`, regenerated: `export const _ontologyResource = {id: 'http://www.w3.org/2002/07/owl'};`
  (was `ns('')`). The terms and register modules are unchanged.
- `package.json`: `@_linked/cli` (dev) ^1.57.1; lockfile refreshed.
- README: `_ontologyResource` is the ontology IRI.

## Gate

- `npx linked build`: "✔ Checking ontology modules … ✔ Build successful".
- `npm test`: "# pass 5 / # fail 0".

## PR

### Summary

`_ontologyResource` is the ontology IRI `http://www.w3.org/2002/07/owl` the data declares, regenerated with cli 1.57.1.

### Changes

- `src/ontologies/owl.data.ts` regenerated: `_ontologyResource = {id: 'http://www.w3.org/2002/07/owl'}`.
- `@_linked/cli` (dev) ^1.57.1; README updated.

### Verification

- `npx linked build`: "✔ Checking ontology modules … ✔ Build successful".
- `npm test`: "# pass 5 / # fail 0".

### Deviations

None.

### Follow-ups

None.
