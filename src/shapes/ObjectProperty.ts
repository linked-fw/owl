import { ShapeSet } from '@_linked/core/collections/ShapeSet';
import { createPropertyShape, objectProperty } from '@_linked/core/shapes/SHACL';
import { shacl } from '@_linked/core/ontologies/shacl';
import { Property } from '@_linked/rdfs/shapes';
import * as owl from '../ontologies/owl.js';
import { linkedShape } from '../package.js';

/** An OWL object property (`owl:ObjectProperty`, a subclass of `rdf:Property`). */
@linkedShape
export class ObjectProperty extends Property {
  static targetClass = owl.ObjectProperty;

  /** The properties this property is equivalent to (`owl:equivalentProperty`), any number. */
  @objectProperty({
    path: owl.equivalentProperty,
    shape: Property,
  })
  get equivalentProperty(): ShapeSet<Property> {
    return new ShapeSet<Property>();
  }

  /**
   * The properties this property is the inverse of (`owl:inverseOf`). OWL states no cardinality
   * and describes the property as relating "two given properties", so any number.
   */
  get inverseOf(): ShapeSet<ObjectProperty> {
    return new ShapeSet<ObjectProperty>();
  }
}

// Self-referencing, so created after the class exists.
createPropertyShape(
  {
    path: owl.inverseOf,
    shape: ObjectProperty,
  },
  'inverseOf',
  shacl.IRI,
  ObjectProperty
);
