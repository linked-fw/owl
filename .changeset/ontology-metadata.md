---
"@_linked/owl": minor
---

`Ontology` reads an ontology's metadata: `title` and `description` (`dcterms:`), `preferredNamespacePrefix`
and `preferredNamespaceUri` (`vann:`, literals), `creator` (`dcterms:creator`, one IRI), `contributor`
(`dcterms:contributor`) and `maintainer` (`schema:maintainer`), any number of IRIs, and `status`
(`adms:status`, one IRI, one of `@_linked/core`'s `core:Draft`, `core:ReadyForReview`, `core:Published`).
The package now depends on `@_linked/dcmi`; the VANN, ADMS and schema.org terms are named by IRI in
`ontologies/metadata-terms`.
