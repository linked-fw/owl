import {linkedPackage} from '@_linked/core/utils/Package';

/**
 * This package's own linked identity.
 *
 * It used to re-export core's decorators verbatim and declare `packageName`
 * as a bare literal that nothing was bound to. The decorators therefore came
 * from `corePackage`, so every shape here registered under `@_linked/core` and
 * was given a `.../shape/core/...` IRI — `shape/core/Ontology`, not
 * `shape/owl/Ontology`. A shape's IRI is persisted data and `Server.call`
 * routes on the package name inside it, so the wrong slug is a wrong identity,
 * not a cosmetic label. It also put owl's exports in core's namespace, where a
 * second package declaring `Ontology` would have collided with this one.
 *
 * See linked-fw/owl#26.
 */
export const {
  linkedShape,
  linkedUtil,
  linkedOntology,
  registerPackageExport,
  registerPackageModule,
  getPackageShape,
  packageExports,
  packageName,
} = linkedPackage('@_linked/owl');
