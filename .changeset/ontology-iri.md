---
'@_linked/owl': patch
---

`_ontologyResource` (`ontologies/owl.data`) is the ontology's own IRI, `http://www.w3.org/2002/07/owl`, as `src/data/owl.ttl`
declares it with `a owl:Ontology`; it was the namespace IRI `http://www.w3.org/2002/07/owl#` since 1.6.0, so this restores the value it had before. Regenerated with
`@_linked/cli` 1.57.1, whose generator reads the declaration (and whose build check would otherwise
report the module stale). Terms are unchanged.
