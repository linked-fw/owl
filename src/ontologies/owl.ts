import { Prefix } from '@_linked/core/utils/Prefix';
import { createNameSpace } from '@_linked/core/utils/NameSpace';

const dataFile = '../data/owl.json';
export const loadData = () => {
  //@ts-ignore
  return import('../data/owl.json', { with: { type: 'json' } }).then(
    (data) => data.default
  );
};

const base = 'http://www.w3.org/2002/07/owl#';
export const ns = createNameSpace(base);
Prefix.add('owl', base);

// The ontology resource itself is defined without the hash in the source ontology.
export const _ontologyResource = { id: 'http://www.w3.org/2002/07/owl' };

export const AnnotationProperty = ns('AnnotationProperty');
export const Class = ns('Class');
export const DataRange = ns('DataRange');
export const DatatypeProperty = ns('DatatypeProperty');
export const DeprecatedClass = ns('DeprecatedClass');
export const DeprecatedProperty = ns('DeprecatedProperty');
export const FunctionalProperty = ns('FunctionalProperty');
export const ObjectProperty = ns('ObjectProperty');
export const Ontology = ns('Ontology');
export const OntologyProperty = ns('OntologyProperty');
export const Restriction = ns('Restriction');
export const SymmetricProperty = ns('SymmetricProperty');
export const TransitiveProperty = ns('TransitiveProperty');

export const allValuesFrom = ns('allValuesFrom');
export const equivalentProperty = ns('equivalentProperty');
export const hasValue = ns('hasValue');
export const inverseOf = ns('inverseOf');
export const minCardinality = ns('minCardinality');
export const onProperty = ns('onProperty');
export const oneOf = ns('oneOf');
export const unionOf = ns('unionOf');

export const owl = {
  _ontologyResource,
  AnnotationProperty,
  Class,
  Ontology,
  onProperty,
  hasValue,
  SymmetricProperty,
  TransitiveProperty,
  inverseOf,
  allValuesFrom,
  ObjectProperty,
  DatatypeProperty,
  DeprecatedClass,
  DeprecatedProperty,
  Restriction,
  minCardinality,
  OntologyProperty,
  FunctionalProperty,
  unionOf,
  oneOf,
  DataRange,
  equivalentProperty,
};

