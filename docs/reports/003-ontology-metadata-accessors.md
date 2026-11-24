---
date: 2026-10-27
summary: >
  Step OA of the host app's ontology plan: `Ontology` gains metadata accessors — title, description (dcterms),
  preferred namespace prefix and URI (vann, literals), creator, contributor (dcterms, IRIs),
  maintainer (schema.org, IRIs), status (adms, one IRI: core's status individuals). owl now
  depends on `@_linked/dcmi`; vann, adms and `schema:maintainer` are named by IRI in
  `ontologies/metadata-terms`. The host app's own ontology shape shrinks to its `dc:` accessors.
  Minor.
---

# 003 — Ontology metadata accessors

## PR

### Summary

Every consumer reads an ontology's title, description, preferred prefix and namespace, creator,
contributors, maintainers and status through `@_linked/owl`'s `Ontology` (contract K-meta of the
host app's plan). The status values are core's public individuals (core report 083). The host app's
own profile of `Ontology` keeps only the Dublin Core *elements* fallbacks (`dc:title`, `dc:description`)
and its Ontology Manager list reads owl's accessors.

### Changes

- **owl** (`6a2669d`):
  - `package.json`: dependency `@_linked/dcmi ^1.6.3` (no cycle: dcmi depends on core and xsd);
    `package-lock.json` regenerated with `npm install --package-lock-only` on a copy outside the
    workspace.
  - `src/ontologies/metadata-terms.ts`: `preferredNamespacePrefix`, `preferredNamespaceUri`
    (`http://purl.org/vocab/vann/`), `status` (`http://www.w3.org/ns/adms#`), `maintainer`
    (`http://schema.org/`), by IRI — no VANN or ADMS package exists, and `@_linked/schema` would
    pull in React.
  - `src/shapes/Ontology.ts`: `title`, `description` (`dcterms:`, literal, maxCount 1);
    `preferredNamespacePrefix`, `preferredNamespaceUri` (literal, maxCount 1); `creator`
    (`dcterms:creator`, IRI, maxCount 1); `contributor` (`dcterms:contributor`, IRI, set);
    `maintainer` (`schema:maintainer`, IRI, set); `status` (`adms:status`, IRI, maxCount 1).
  - `test/ontology-metadata.test.mjs`: each of the eight property shapes has its path, node kind
    and count; `declaredPrefix` keeps `sh:prefix`. `test/shape-check.test.mjs` also loads dcmi's
    dcterms data, so the dcterms terms are held to dcmi's mirror.
  - README section "Ontology metadata"; changeset `ontology-metadata.md` (minor).
- **core** (`25109b4`): the status individuals — core `docs/reports/083-ontology-status-individuals.md`.
- **Host app**: its ontology shape keeps `elementsTitle` / `elementsDescription` and inherits the
  rest; its ontology list selects `preferredNamespacePrefix` / `preferredNamespaceUri`; its test
  mock follows. Its term search (landed by step TS while this step ran) reads the same two
  accessors. The host app's own vann and adms term modules stay for its other uses.

### Verification

- **owl**: `npx linked build` — `✔ Build successful` (shape hierarchy checked). `npm test`
  (1.3 s): `# tests 14  # pass 14  # fail 0`.
- **core**: see core report 083 (`npm test` on core `dev` `f6de1ba`: 137 suites passed, 16 skipped;
  2548 tests passed, 534 skipped; 35 s).
- **Host app**: its ontology list and term search tests (0.8 s): `Test Files  2 passed (2)`,
  `Tests  17 passed (17)`; its shape-check test (23.7 s): `Tests  4 passed (4)`.
- **Host app** regular test set on port 4352 (worktree, 4 min 53 s wall clock; includes an
  integration test that seeds `vann:` statements and reads them through the term search):

  ```
  Test Files  331 passed | 1 skipped (332)
       Tests  3073 passed | 5 skipped (3078)
  Test Suites: 6 passed, 6 total / Tests: 68 passed, 68 total
  Test Suites: 24 passed, 24 total / Tests: 418 passed, 418 total
  Test Files  3 passed (3) / Tests  9 passed (9)
    14 skipped
    351 passed (3.8m)

  test:regular
    typecheck:gate                                   FAIL   15s
    unit (vitest)                                    PASS   41s
    packages                                         PASS    6s
    playwright (integration + sign-in e2e)           PASS  231s
  ```

  The typecheck step fails in the worktree only because it overlays core (two copies of core's
  types, 77 errors such as `Property 'shape' in type 'BranchProvider' is not assignable…`; the
  same without this change). Measured with one copy, `@_linked/core` pointed at the main
  checkout's core: `No new type errors. 0 pre-existing errors still in the baseline.` The final
  rebase onto the host app's `dev` brought only shape-catalog changes; the typecheck gate in the
  main checkout after landing is in the step's hand-off.
- The host app booted on this owl and core on :4352: its ontology sync wrote `@_linked/core`, no
  shape-hierarchy finding in the log.
- Earlier attempts of the regular set ran Fuseki out of its 2g heap (shared with parallel agents'
  runs); the run above is on the 4g Fuseki.

### Deviations

- The shape check also loads `@_linked/dcmi/ontologies/dcterms.register.js` (not in the
  sub-plan): without dcmi's data registered the check would not look at the dcterms paths.
- The host app's typecheck gate in a worktree that overlays core sees two copies of core's types (the same
  with or without this change; core report 080 records it). It is measured with one copy.
- The host app's term search (step TS) switched to owl's accessors here: it read the removed
  `preferredPrefix` / `preferredNamespace`, and K-meta has every reader switch in this landing.
- The core report is 083, not 081: 081 and 082 were taken on core `dev` while this step ran.

### Follow-ups

None new. Writing creator, contributor, maintainer and status is step SV, showing them step NP
(the host app's sub-plan).

## Details

- `prefix` / `declaredPrefix` stay the SHACL prefix declaration; the preferred prefix is
  `preferredNamespacePrefix`, never `prefix`.
- `creator` and `status` return a `NodeReferenceValue` (null when unset), `contributor` and
  `maintainer` a `NodeReferenceValue[]`, the way `NamedIndividual.sameAs` reads IRIs without a
  value shape.
- Read through the host app's ontology shape (`select(...).from(graph)`) on a throwaway in-memory Fuseki
  dataset (dropped after): an ontology with `dcterms:` and `vann:` statements returned
  `{title: "Demo", description: "Bricks and parts", preferredNamespacePrefix: "dm",
  preferredNamespaceUri: "https://example.org/ont/demo/", versionInfo: "0.1.0"}`, and one
  with only `dc:` returned `elementsTitle` / `elementsDescription`.
