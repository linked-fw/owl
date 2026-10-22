import { ShapeSet } from '@_linked/core/collections/ShapeSet';
import { createPropertyShape, objectProperty } from '@_linked/core/shapes/SHACL';
import { shacl } from '@_linked/core/ontologies/shacl';
import { Class as RdfsClass } from '@_linked/rdfs/shapes';
import { owl } from '../ontologies/owl.js';
import { linkedShape } from '../package.js';

/** An OWL class (`owl:Class`, which OWL makes a subclass of `rdfs:Class`). */
@linkedShape
export class Class extends RdfsClass {
  static targetClass = owl.Class;

  /**
   * The classes this class is disjoint with (`owl:disjointWith`). OWL states no cardinality and
   * describes the property as relating "two given classes", so any number.
   */
  get disjointWith(): ShapeSet<Class> {
    return new ShapeSet<Class>();
  }

  /** The classes this class is equivalent to (`owl:equivalentClass`), any number. */
  @objectProperty({
    path: owl.equivalentClass,
    shape: RdfsClass,
  })
  get equivalentClass(): ShapeSet<RdfsClass> {
    return new ShapeSet<RdfsClass>();
  }
}

// Self-referencing, so created after the class exists.
createPropertyShape(
  {
    path: owl.disjointWith,
    shape: Class,
  },
  'disjointWith',
  shacl.IRI,
  Class
);
