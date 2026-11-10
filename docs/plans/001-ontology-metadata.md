---
summary: >
  owl sub-plan of the host app's ontology master plan (create, edit, review, publish): step OA —
  metadata accessors on `@_linked/owl`'s `Ontology` (title, description, preferred namespace
  prefix/URI, creator, contributor, maintainer, status), owl depending on `@_linked/dcmi`, the
  ontology status individuals in `@_linked/core`, and the host app's own ontology shape shrinking
  to its `dc:` accessors in the same landing. A step agent reads its section and the Contracts here.
status: Plan
---

# 001 — Ontology metadata accessors (sub-plan of the host app's ontology plan)

Master plan: the host app's ontology master plan (how to use it, rules for every step, status
table, waves, numbers, starter prompt, decisions), with a sub-plan for the host app's own steps (EC,
TS, NP, SV, NO, AD). Steps land on integration branch `dev` of owl, core and the host app; see the
master plan's "Rules for every step".

## Contracts

Copied verbatim from the master plan; a step that changes it updates it here, in the master plan
and in the host app's sub-plan, in the same landing.

- **K-meta** (provider OA; consumers NP, SV, the host app's ontology list): `@_linked/owl` `Ontology`
  gains accessors `title` (`dcterms:title`), `description` (`dcterms:description`),
  `preferredNamespacePrefix` (`vann:preferredNamespacePrefix`, literal), `preferredNamespaceUri`
  (`vann:preferredNamespaceUri`, literal), `creator` (`dcterms:creator`, IRI, maxCount 1),
  `contributor` (`dcterms:contributor`, IRI, set), `maintainer` (`schema:maintainer`
  = `http://schema.org/maintainer`, IRI, set), `status` (`adms:status` = `http://www.w3.org/ns/adms#status`,
  IRI, maxCount 1). owl depends on `@_linked/dcmi` for the dcterms terms; vann, adms and
  `schema:maintainer` are named by IRI in a small local owl module (no `@_linked/schema`
  dependency). Status individuals in `@_linked/core`: class `core:OntologyStatus`, individuals
  `core:Draft`, `core:ReadyForReview`, `core:Published` (IRIs
  `https://linked.cm/ont/core/OntologyStatus`, `…/Draft`, `…/ReadyForReview`, `…/Published`),
  exported on `coreOntology`. The host app's own ontology shape keeps only `elementsTitle` /
  `elementsDescription` (`dc:`); its readers switch to the owl accessors in the same landing.

## OA — Ontology metadata accessors and status individuals

**Depends on:** nothing (wave 1, parallel with EC and TS). **Repos:** core, owl, the host app
(worktree `--with owl,core`). **Plan doc:** owl `docs/plans/002-…`. **Reports:** owl `docs/reports/003-…`,
core `docs/reports/081-…` (a short one; the owl report links it). **Test port:** 4352. **Size:**
small to medium, 2 phases: (1) core status individuals, owl accessors and the local term module,
with tests and changesets; (2) the host app's ontology shape shrinks and its readers switch, regular set.

**Goal.** K-meta: every consumer reads an ontology's title, description, preferred prefix and
namespace, creator, contributors, maintainers and status through `@_linked/owl`'s `Ontology`, and
the status values are public individuals in `@_linked/core`.

**Scope.**
- **core**: class `core:OntologyStatus` and individuals `core:Draft`, `core:ReadyForReview`,
  `core:Published` (each `a owl:NamedIndividual, core:OntologyStatus`, with `rdfs:label` and
  `rdfs:comment` in English) in `src/data/core.ttl`, the terms in `src/ontologies/linked-core.ts`
  and on `coreOntology`. Changeset minor.
- **owl**: dependency `@_linked/dcmi` (`^1.6.3`, the current version); a small local module
  `src/ontologies/metadata-terms.ts` naming by IRI `vann:preferredNamespacePrefix`,
  `vann:preferredNamespaceUri` (`http://purl.org/vocab/vann/`), `adms:status`
  (`http://www.w3.org/ns/adms#status`) and `schema:maintainer` (`http://schema.org/maintainer`);
  accessors on `Ontology` (`src/shapes/Ontology.ts`): `title`, `description` (`dcterms:`, literal,
  maxCount 1), `preferredNamespacePrefix`, `preferredNamespaceUri` (literal, maxCount 1),
  `creator` (`dcterms:creator`, IRI, maxCount 1), `contributor` (`dcterms:contributor`, IRI, set),
  `maintainer` (IRI, set), `status` (`adms:status`, IRI, maxCount 1). Readme section on the
  accessors. Changeset minor.
- **Host app**: its ontology shape (a subclass of `Ontology`) keeps only `elementsTitle` and
  `elementsDescription` (`dc:`); its ontology list reads `title`, `description`,
  `preferredNamespacePrefix`, `preferredNamespaceUri` from the owl accessors; its test mock follows.
  The host app's local vann and adms term modules stay for its other uses.
- Not here: writing creator/contributor/maintainer/status (SV), showing them (NP).

**Verify.**
- core: `npx linked build && npm test` (quote the summary); `core.ttl` parses and the four IRIs
  are in `coreOntology`.
- owl: `npx linked build && npm test` (includes `test/shape-check.test.mjs`, which now lists dcmi
  among the dependencies); a test that `Ontology`'s property shapes have the eight paths above with
  the stated kinds and counts.
- Host app: its typecheck gate, its ontology list test and its regular test set on port 4352; the
  Ontology Manager list on :4352 still shows titles, prefixes and descriptions.

**Done when.** K-meta holds as written; core, owl and the host app land together (core, owl, then the
host app), each framework repo with its changeset; the owner's running host app on :4040 shows the Ontology Manager list as
before after a rebuild.

### Files (found in the code, on owl `dev` 7fe1356 and core `dev`)

- owl `src/shapes/Ontology.ts`: `Resource` imported from `@_linked/rdfs/shapes` :9;
  `@linkedShape` :14; `class Ontology extends Resource` :15; `declare` (`shacl.declare`) :18-24,
  `declaredPrefix` (`shacl.prefix`) :26-32, plain `prefix` getter :34-36, `versionInfo` :38-45;
  self-referencing getters (range `owl:Ontology`: `imports`, `versionIRI`, `priorVersion`,
  `backwardCompatibleWith`, `incompatibleWith`) :47-70, their `createPropertyShape` paths :73-98
  (made after the class exists). The new accessors are plain literal/IRI ones and use decorators.
- owl `package.json`: dependencies `@_linked/core ^2.41.0`, `@_linked/rdfs ^1.4.0`; scripts
  `build` (`linked build`), `test` (`node --test test/*.test.mjs`); `.changeset/` exists;
  `src/package.ts:26` mirrors only `http://www.w3.org/2002/07/owl#`; `src/ontologies/` holds
  `owl.ts`, `owl.data.ts`, `owl.register.ts`.
- owl `test/shape-check.test.mjs`: `checkShapeHierarchy({ dependencies: { [packageName]: [...Object.keys(manifest.dependencies ?? {}), …] } })`
  :24-30 (reads the manifest, so dcmi is listed once it is in `package.json`); MIRRORS filter :18,
  :31-35.
- dcmi (`packages-local/_linked-dcmi`, 1.6.3): `src/ontologies/dcterms.ts` `contributor` :165,
  `creator` :174, `description` :189, `title` :291 (named exports: `import * as dcterms from
  '@_linked/dcmi/ontologies/dcterms'`); dependencies core and xsd only; rdfs depends on core and
  react, not on owl or dcmi — no cycle.
- Shape check: `packages-local/_linked-core/src/shapes/checkShapeHierarchy.ts:322-371` (the mirror
  rule flags an IRI only inside a mirrored namespace and not defined in that package's data). dcmi
  mirrors its namespaces (`dcmi/src/package.ts:26`): `title`, `description`, `creator`,
  `contributor` are defined, so they pass. schema mirrors `http://schema.org/`
  (`schema/src/package.ts:13`) and defines `maintainer` (`schema.ts:7014`); vann and adms have no
  mirroring package.
- core `src/ontologies/linked-core.ts`: namespace `https://linked.cm/ont/core/` :20, term pattern
  `const OntologyPackage = ns('OntologyPackage');` :31, `coreOntology` :97-129. `src/data/core.ttl`:
  class pattern :35-39; no individuals yet. Last report 080.
- Host app: its ontology shape declares `title`, `elementsTitle`, `description`,
  `elementsDescription`, `preferredPrefix` and `preferredNamespace`; one service reads them with a
  `select`, and its test mocks them. It has its own vann, adms and foaf term modules.

### Pitfalls

- **Name clashes on `Ontology`**: `prefix` and `declaredPrefix` already exist (the SHACL prefix);
  the new ones are `preferredNamespacePrefix` / `preferredNamespaceUri`, never `prefix`.
  `PackageOntology` extends `Ontology`: remove its `title` / `description` so they are inherited,
  not redeclared.
- **No `@_linked/schema` dependency** (it pulls in react, primitives and server-utils): name
  `schema:maintainer` by IRI with the `http://` namespace.
- **Land together**: the host app's reader changes need the new owl in `packages-local`; land
  core, owl, then the host app, and rebuild core and owl in the main checkout (`npx linked build`)
  before the owner's host app restarts.
- The owl shape check runs against every registered mirror in the host app (schema included): boot
  it once on :4352 and check the log for shape-hierarchy warnings.
- Build the CLI first after pulling `dev` (the master plan's rules).
- Do not edit the host app files another running plan owns (the master plan's §Waves).

### Architecture

- The host app's architecture docs on standard-vocabulary packages (`@_linked/*` layering) and on
  shapes and accessors; the decisions record in the master plan (people in the `.ttl`, status
  values).

### Tests

- **Quick gate (1–2 min):** core `npm test -- <the ontology test>` or `npm test`; owl
  `npx linked build && npm test`; the host app's ontology list test.
- **Full gate:** core and owl `npx linked build && npm test`; the host app's typecheck gate and
  regular test set.

## Progress

- [x] OA — landed on `dev` (core, owl, host app); reports owl `docs/reports/003-ontology-metadata-accessors.md`, core `docs/reports/083-ontology-status-individuals.md`.
