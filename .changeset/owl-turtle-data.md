---
'@_linked/owl': major
---

The ontology data ships as Turtle, and the package shapes OWL's classes and properties.

- `src/data/owl.json` is replaced by `src/data/owl.ttl` (the same 450 triples), copied into
  `lib/esm/data/` by the build. `loadData()` now resolves to the Turtle text (`string[]`, read
  through `@_linked/core/ontology/loadOntologyFiles`, server only) instead of the JSON-LD
  document, and the module exports `dataFiles`.
- New shapes: `Class` (`owl:Class`, extends rdfs `Class`; `disjointWith`, `equivalentClass`),
  `ObjectProperty` (`equivalentProperty`, `inverseOf`), `DatatypeProperty` and
  `AnnotationProperty` (`equivalentProperty`), each extending rdfs `Property`, and
  `NamedIndividual` (`sameAs`, `differentFrom`, `label` and `comment` (`rdfs:label`,
  `rdfs:comment`, as rdfs `Resource` reads them) and a typed `type` (the `rdf:type` property every
  shape has); OWL makes it a subclass of `owl:Thing` only, so it extends no rdfs shape). Every relation between classes, properties or individuals is
  multi-valued: OWL states no cardinality and describes each as relating "two given" terms.
- `Ontology` gains `versionInfo`, `versionIRI` and `priorVersion` (single) and `imports`,
  `backwardCompatibleWith` and `incompatibleWith` (multi-valued).
- **Breaking:** `Restriction` extends the new `Class` instead of `Shape`
  (`owl:Restriction ⊑ owl:Class`), so it inherits `Class`'s properties and a restriction is an
  `instanceof Class` (and of rdfs `Class` and `Resource`).
- The `owl` ontology exports the OWL terms consumers used to copy: `versionInfo`, `imports`,
  `versionIRI`, `priorVersion`, `backwardCompatibleWith`, `incompatibleWith`, `NamedIndividual`,
  `Thing`, `sameAs`, `differentFrom`, `AllDifferent`, `distinctMembers`, `disjointWith`,
  `disjointUnionOf`, `equivalentClass`, `complementOf`, `intersectionOf`,
  `InverseFunctionalProperty`, `AsymmetricProperty`, `ReflexiveProperty`, `IrreflexiveProperty`,
  `propertyDisjointWith`, `propertyChainAxiom`.
- Requires `@_linked/rdfs` with `Class.subClassOf` and multi-valued `Property.domain`/`range`.
- The package declares that it mirrors `http://www.w3.org/2002/07/owl#`, so the shape check
  reports any term in it the data does not define. A test asserts the check finds nothing in
  this package.
