import { ShapeSet } from '@_linked/core/collections/ShapeSet';
import { objectProperty } from '@_linked/core/shapes/SHACL';
import { Property } from '@_linked/rdfs/shapes';
import { owl } from '../ontologies/owl.js';
import { linkedShape } from '../package.js';

/** An OWL data property (`owl:DatatypeProperty`, a subclass of `rdf:Property`). */
@linkedShape
export class DatatypeProperty extends Property {
  static targetClass = owl.DatatypeProperty;

  /** The properties this property is equivalent to (`owl:equivalentProperty`), any number. */
  @objectProperty({
    path: owl.equivalentProperty,
    shape: Property,
  })
  get equivalentProperty(): ShapeSet<Property> {
    return new ShapeSet<Property>();
  }
}
