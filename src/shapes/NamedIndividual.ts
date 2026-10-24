import { literalProperty, objectProperty } from '@_linked/core/shapes/SHACL';
import * as rdfs from '@_linked/rdfs/ontologies/rdfs';
import { Shape } from '@_linked/core/shapes/Shape';
import type { NodeReferenceValue } from '@_linked/core/utils/NodeReference';
import * as owl from '../ontologies/owl.js';
import { linkedShape } from '../package.js';

/**
 * A named individual (`owl:NamedIndividual`). OWL makes it a subclass of `owl:Thing` only, which
 * this package does not shape, so it extends no rdfs shape. It reads its label and comment as
 * rdfs `Resource` does, and its types through the `rdf:type` property every shape has.
 */
@linkedShape
export class NamedIndividual extends Shape {
  static targetClass = owl.NamedIndividual;

  /** The individual's name (`rdfs:label`), one label, as rdfs `Resource` has it. */
  @literalProperty({
    path: rdfs.label,
    maxCount: 1,
  })
  get label(): string {
    return '';
  }

  /** What the individual is (`rdfs:comment`), one description, as rdfs `Resource` has it. */
  @literalProperty({
    path: rdfs.comment,
    maxCount: 1,
  })
  get comment(): string {
    return '';
  }

  /** The individual's classes (`rdf:type`, from `Shape`), any number. */
  get type(): NodeReferenceValue[] {
    return [];
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
