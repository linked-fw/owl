---
"@_linked/owl": minor
---

The `owl` accessor modules are generated from `src/data/owl.ttl` by `linked generate-ontology`
(`package.json` `"linkedOntologies"`), and `linked build` fails when they are stale.
`ontologies/owl` exports one named term for each of the 77 subjects of the namespace (up from 44).

Breaking changes:

- The aggregated `owl` object is gone. Import the module as a namespace:

  ```ts
  import * as owl from '@_linked/owl/ontologies/owl';
  static targetClass = owl.Class;
  ```

- `ns`, `dataFiles`, `loadData` and `_ontologyResource` moved to `@_linked/owl/ontologies/owl.data`;
  `import * as owl` no longer reaches them, and the registered ontology carries only its terms.
- `_ontologyResource` is now the namespace IRI `http://www.w3.org/2002/07/owl#`, like every
  generated data module; it was the ontology's own IRI, `http://www.w3.org/2002/07/owl`.
- No terms were renamed.
- Requires `@_linked/core` ^2.41.0 and `@_linked/rdfs` ^1.4.0.
