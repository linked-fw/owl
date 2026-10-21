import { literalProperty, objectProperty } from '@_linked/core/shapes/SHACL';
import { rdfs } from '@_linked/core/ontologies/rdfs';
import { Shape } from '@_linked/core/shapes/Shape';
import type { NodeReferenceValue } from '@_linked/core/utils/NodeReference';
import { owl } from '../ontologies/owl.js';
import { linkedShape } from '../package.js';

/**
 * A named individual (`owl:NamedIndividual`). OWL makes it a subclass of `owl:Thing` only, which
 * this package does not shape, so it extends no rdfs shape. Its label (`rdfs:label`) and types
 * (`rdf:type`) come from `Shape`; its comment is declared here.
 */
@linkedShape
export class NamedIndividual extends Shape {
  static targetClass = owl.NamedIndividual;

  /** What the individual is (`rdfs:comment`), one description, as rdfs `Resource` has it. */
  @literalProperty({
    path: rdfs.comment,
    maxCount: 1,
  })
  get comment(): string {
    return '';
  }

  /**
   * The individuals this one is the same as (`owl:sameAs`). OWL states no cardinality and
   * describes the property as relating "two given individuals", so any number.
   */
  @objectProperty({
    path: owl.sameAs,
  })
  get sameAs(): NodeReferenceValue[] {
    return [];
  }

  /** The individuals this one is different from (`owl:differentFrom`), any number. */
  @objectProperty({
    path: owl.differentFrom,
  })
  get differentFrom(): NodeReferenceValue[] {
    return [];
  }
}
