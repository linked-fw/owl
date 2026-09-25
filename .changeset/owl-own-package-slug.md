---
'@_linked/owl': minor
---

Register this package's shapes under the `owl` slug, not `core`

`src/package.ts` re-exported core's decorators instead of creating this
package's own `linkedPackage('@_linked/owl')`, so `@linkedShape` bound to
`corePackage`. **The shape IRIs change:**

| Before | After |
| --- | --- |
| `https://linked.cm/shape/core/Ontology` | `https://linked.cm/shape/owl/Ontology` |
| `https://linked.cm/shape/core/Restriction` | `https://linked.cm/shape/owl/Restriction` |
| `https://linked.cm/shape/core/Restriction/onProperty` | `https://linked.cm/shape/owl/Restriction/onProperty` |
| `https://linked.cm/shape/core/Restriction/hasValue` | `https://linked.cm/shape/owl/Restriction/hasValue` |

A shape IRI is persisted data, so this is a minor rather than a patch: anything
that stored or compared these ids sees new ones. This package's exports also
move out of core's entry in the package tree and into `@_linked/owl`, which is
what `Server.call` routes on.

Closes #26.
