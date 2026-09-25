import { literalProperty, objectProperty } from '@_linked/core/shapes/SHACL';
import type { NodeReferenceValue } from '@_linked/core/utils/NodeReference';
import { Prefix } from '@_linked/core/utils/Prefix';
import { Resource } from '@_linked/rdfs/shapes';
import { owl } from '../ontologies/owl.js';
import { linkedShape } from '../package.js';
import { shacl } from '@_linked/core/ontologies/shacl';

@linkedShape
export class Ontology extends Resource {
  static targetClass = owl.Ontology;

  @objectProperty({
    path: shacl.declare,
    maxCount: 1,
  })
  get declare(): NodeReferenceValue {
    return null;
  }

  @literalProperty({
    path: shacl.prefix,
    maxCount: 1,
  })
  get declaredPrefix(): string {
    return '';
  }

  get prefix(): string | undefined {
    return Prefix.getPrefix(this.id) || undefined;
  }
}
