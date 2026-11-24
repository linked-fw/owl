---
date: 2026-11-10
summary: >
  The ontology data carries its suggested prefix as vann data (owl) in an added file, as the
  cli's ontology generator now requires; modules regenerated. Prefixes and terms unchanged. Patch.
---

# 004 — Suggested prefix as vann data

## PR

### Summary

`linked generate-ontology` and `linked build` now read an ontology's suggested prefix from
`vann:preferredNamespacePrefix` and `vann:preferredNamespaceUri` on its `owl:Ontology` node, and
refuse an ontology without them. This package's published data has no such triples, so they are
added, with the prefix the package registers today, in a separate file next to the published one.

### Changes

- `src/data/owl-added.ttl` (new): `vann:preferredNamespacePrefix` `"owl"` and `vann:preferredNamespaceUri` (the configured namespace) on the ontology's `owl:Ontology` node (owl: <http://www.w3.org/2002/07/owl>). The published data is unedited; the node is already declared there.
- `package.json`: the added file is in the ontology's `"linkedOntologies"` `data`, after the published file.
- `src/ontologies/*`: regenerated; only the `// Data:` header and `dataFiles` change. The registered prefix and the terms are unchanged.
- README §The data: names the added file and what it holds.
- Changeset `.changeset/vann-suggested-prefix.md` (patch).

### Verification

```
build: ✔ Build successful
npm test: # tests 14 # pass 14 # fail 0 
owl: 77 terms from src/data/owl.ttl, src/data/owl-added.ttl
Every ontology module is current.
```

`git diff --stat` touches only `src/data/*-added.ttl`, `package.json`, `src/ontologies/*`, README,
the changeset and this report.

### Deviations

- README changed too: the README said the package had no `-added` file.

### Follow-ups

None. The same change in the other standard-vocabulary packages: @_linked/org 001, @_linked/rdfs 001, @_linked/sioc 001, @_linked/xsd 002.

## Details

- The value written is the prefix the data module already registered (`Prefix.add`), so Turtle
  output and stored data do not change.
- The subject is the ontology IRI the generator takes from the published `owl:Ontology`
  declaration (without the `#`); vann data on another node would be ignored.
