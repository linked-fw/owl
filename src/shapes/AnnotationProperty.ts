import { ShapeSet } from '@_linked/core/collections/ShapeSet';
import { objectProperty } from '@_linked/core/shapes/SHACL';
import { Property } from '@_linked/rdfs/shapes';
import * as owl from '../ontologies/owl.js';
import { linkedShape } from '../package.js';

/** An OWL annotation property (`owl:AnnotationProperty`, a subclass of `rdf:Property`). */
@linkedShape
export class AnnotationProperty extends Property {
  static targetClass = owl.AnnotationProperty;

  /** The properties this property is equivalent to (`owl:equivalentProperty`), any number. */
  @objectProperty({
    path: owl.equivalentProperty,
    shape: Property,
  })
  get equivalentProperty(): ShapeSet<Property> {
    return new ShapeSet<Property>();
  }
}
