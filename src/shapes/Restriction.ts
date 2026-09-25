import { objectProperty } from '@_linked/core/shapes/SHACL';
import type { NodeReferenceValue } from '@_linked/core/utils/NodeReference';
import { Shape } from '@_linked/core/shapes/Shape';
import { Property, Resource } from '@_linked/rdfs/shapes';
import { owl } from '../ontologies/owl.js';
import { linkedShape } from '../package.js';

@linkedShape
export class Restriction extends Shape {
  static targetClass = owl.Restriction;

  @objectProperty({
    path: owl.onProperty,
    maxCount: 1,
    shape: Property,
  })
  get onProperty(): Property {
    return null;
  }

  @objectProperty({
    path: owl.hasValue,
    maxCount: 1,
  })
  get hasValue(): NodeReferenceValue {
    return null;
  }

  restrictPropertyHasValue(_property: NodeReferenceValue, _value: Resource) {
    throw new Error(
      'Restriction.restrictPropertyHasValue depends on legacy mutation and is not migrated'
    );
  }
}
