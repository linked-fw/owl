---
summary: >
  Step OA of CN plan 070 (owl sub-plan 001 §OA): core status individuals, owl `Ontology`
  metadata accessors with a local vann/adms/schema term module, CN `PackageOntology` shrinking to
  its `dc:` accessors. Tasks and progress.
status: Tasks
---

# 002 — Ontology metadata accessors (step OA)

Scope, contract (K-meta), files and pitfalls: sub-plan `docs/plans/001-ontology-metadata.md` §OA.
Worktree `/Users/rene/web/wt/oa` (`--with owl,core`), port 4352.

## Phases

### Phase 1 — core status individuals; owl accessors and term module

Tasks:
1. core `src/data/core.ttl`: `core:OntologyStatus` (`owl:Class`) and `core:Draft`,
   `core:ReadyForReview`, `core:Published` (`a owl:NamedIndividual, core:OntologyStatus`, English
   `rdfs:label` / `rdfs:comment`).
2. core `src/ontologies/linked-core.ts`: the four terms, on `coreOntology`.
3. core `src/tests/core-ontology.test.ts`: the four IRIs on `coreOntology`, typed in `core.ttl`.
4. core changeset (minor).
5. owl `package.json`: dependency `@_linked/dcmi ^1.6.3`.
6. owl `src/ontologies/metadata-terms.ts`: `vann.preferredNamespacePrefix`,
   `vann.preferredNamespaceUri`, `adms.status`, `schema.maintainer`, by IRI.
7. owl `src/shapes/Ontology.ts`: `title`, `description`, `preferredNamespacePrefix`,
   `preferredNamespaceUri` (literal, maxCount 1), `creator` (IRI, maxCount 1), `contributor`
   (IRI, set), `maintainer` (IRI, set), `status` (IRI, maxCount 1).
8. owl test `test/ontology-metadata.test.mjs`: the eight paths, kinds (literal / IRI node kind)
   and counts.
9. owl README section on the accessors; changeset (minor).

Validation: core `npx linked build && npm test`; owl `npx linked build && npm test` (shape check
included, with dcmi among the dependencies).

### Phase 2 — CN `PackageOntology` shrinks, readers switch

Tasks:
1. `src/shapes/ontologies/PackageOntology.ts`: only `elementsTitle`, `elementsDescription`.
2. `src/services/projectOntologies.ts`: select `preferredNamespacePrefix` /
   `preferredNamespaceUri` (title, description inherited from owl).
3. `src/services/projectOntologies.test.ts`: mock rows use the owl names.

Validation: `npm run typecheck:gate`; `npx vitest run src/services/projectOntologies.test.ts`;
boot on :4352 (no shape-hierarchy warnings for owl); `CN_TEST_PORT=4352 npm run test:regular`
under the regular-set lock; Ontology Manager list on :4352 shows titles, prefixes, descriptions.

## Dependencies

Phase 2 needs phase 1 built (owl lib with the new accessors). No parallel work.

## Progress

- [ ] Phase 1
- [ ] Phase 2
