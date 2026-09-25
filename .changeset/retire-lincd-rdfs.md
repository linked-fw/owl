---
'@_linked/owl': minor
---

Replace the `lincd-rdfs` dependency with `@_linked/rdfs` (^1.0.0)

`Ontology` and `Restriction` now import `Resource`/`Property` from
`@_linked/rdfs/shapes`. This retires the last `lincd` code dependency in the
framework — `grep -rn lincd src/ lib/` is now empty.

The inherited shape IRIs move with the package rename:
`https://linked.cm/shape/lincd-rdfs/Resource` becomes
`https://linked.cm/shape/rdfs/Resource`, and `Restriction.onProperty` now
targets `https://linked.cm/shape/rdfs/Property`. No data migration is
required. `@_linked/owl`'s own exported API is unchanged.
