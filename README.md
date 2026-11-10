# @_linked/owl

[OWL 2](https://www.w3.org/TR/owl2-overview/) for Linked: the OWL vocabulary as Turtle, an
accessor for every term, and shapes for its classes (`Class`, `ObjectProperty`,
`DatatypeProperty`, `AnnotationProperty`, `NamedIndividual`, `Ontology`, `Restriction`). The
package mirrors `http://www.w3.org/2002/07/owl#` and holds only its terms.

## Terms

```ts
import * as owl from '@_linked/owl/ontologies/owl';

static targetClass = owl.Class;
```

`ontologies/owl` has one named export per term (77), each an `{id}` with the term's full IRI.
`ontologies/index` registers the ontology with its data and suggested prefix; the package entry and
`shapes/index` import it. The package registers no prefix: an app lists the prefixes it uses in
its own prefix map. Where code needs a namespace function, core's `createNameSpace('http://www.w3.org/2002/07/owl#')` gives one.
`linked generate-ontology` writes the modules
from the data (`package.json` `"linkedOntologies"`), and `linked build` fails when they are stale;
never edit them by hand.

## Ontology metadata

`Ontology` (`@_linked/owl/shapes/Ontology`) reads what an ontology states about itself:

| Accessor | Path | Value |
|---|---|---|
| `title` | `dcterms:title` | literal, one |
| `description` | `dcterms:description` | literal, one |
| `preferredNamespacePrefix` | `vann:preferredNamespacePrefix` | literal, one |
| `preferredNamespaceUri` | `vann:preferredNamespaceUri` | literal, one |
| `creator` | `dcterms:creator` | IRI, one |
| `contributor` | `dcterms:contributor` | IRIs, any number |
| `maintainer` | `schema:maintainer` (`http://schema.org/maintainer`) | IRIs, any number |
| `status` | `adms:status` (`http://www.w3.org/ns/adms#status`) | IRI, one |

```ts
const o = await Ontology.select((o) => [o.title, o.preferredNamespacePrefix, o.status]).for({id});
```

The status is one of `@_linked/core`'s `core:Draft`, `core:ReadyForReview` and `core:Published`
(`coreOntology` in `@_linked/core/ontologies/linked-core`). `declaredPrefix` is the SHACL prefix
declaration (`sh:prefix`), not the preferred prefix. `prefix` is the prefix the app's prefix map
gives the ontology's IRI (undefined when the map has none; for another map,
`Prefix.getPrefix(o.id, map)`). The Dublin Core terms come from
`@_linked/dcmi`; the VANN, ADMS and schema.org terms are named by IRI in
`ontologies/metadata-terms`, so the package depends on neither a VANN nor an ADMS package, nor on
`@_linked/schema`.

## The data

`src/data/owl.ttl` is the OWL 2 vocabulary as the W3C publishes it at the namespace,
<https://www.w3.org/2002/07/owl> (Turtle, `owl:versionInfo "$Date: 2009/11/15 10:54:12 $"`,
Last-Modified 2009-11-15), unchanged apart from a leading comment that names the source and LF
line endings. To refresh, download it with `curl -sSL -H 'Accept: text/turtle'
https://www.w3.org/2002/07/owl`, put the comment back with the new version, and run
`npx linked generate-ontology`.

The official files are the only source of the package's terms: the package never adds a class
or property to a standard's namespace. What the published standard lacks, mainly metadata, goes
in one extra file per prefix, `src/data/<prefix>-added.ttl`, listed in `"linkedOntologies"`' data:

- the ontology entity itself: `owl:Ontology`, title, description,
  `vann:preferredNamespacePrefix`, `vann:preferredNamespaceUri`, the source URL and version;
- annotations on terms the standard already defines, such as a missing `rdfs:label`.

New classes or properties never go there; a term a standard lacks belongs in the consumer's own
ontology package.

The official file carries its own ontology header (on `<http://www.w3.org/2002/07/owl>`, without
the `#`) but no suggested prefix, so `src/data/owl-added.ttl` adds `vann:preferredNamespacePrefix
"owl"` and `vann:preferredNamespaceUri` to it.

## Development

```bash
npx linked build    # checks the ontology modules, compiles, writes lib/esm/data/shapes.ttl
npm test            # runs against lib/
```

## Data license

The package code is MIT licensed (see `LICENSE`). The bundled ontology data is derived from the W3C OWL specification and is not covered by the MIT license: it remains under the W3C Software and Document License, https://www.w3.org/copyright/software-license-2023/. See `NOTICE`.
