import { Prefix } from '@_linked/core/utils/Prefix';
import { createNameSpace } from '@_linked/core/utils/NameSpace';
import { loadOntologyFiles } from '@_linked/core/ontology/loadOntologyFiles';

/** The package's ontology data, relative to this module (Turtle, copied into `lib/` by the build). */
export const dataFiles = ['../data/owl.ttl'];

/** Reads the package's ontology data (server only). */
export const loadData = () => loadOntologyFiles(import.meta.url, dataFiles);

const base = 'http://www.w3.org/2002/07/owl#';
export const ns = createNameSpace(base);
Prefix.add('owl', base);

// The ontology resource itself is defined without the hash in the source ontology.
export const _ontologyResource = { id: 'http://www.w3.org/2002/07/owl' };

export const AllDifferent = ns('AllDifferent');
export const AnnotationProperty = ns('AnnotationProperty');
export const AsymmetricProperty = ns('AsymmetricProperty');
export const Class = ns('Class');
export const DataRange = ns('DataRange');
export const DatatypeProperty = ns('DatatypeProperty');
export const DeprecatedClass = ns('DeprecatedClass');
export const DeprecatedProperty = ns('DeprecatedProperty');
export const FunctionalProperty = ns('FunctionalProperty');
export const InverseFunctionalProperty = ns('InverseFunctionalProperty');
export const IrreflexiveProperty = ns('IrreflexiveProperty');
export const NamedIndividual = ns('NamedIndividual');
export const ObjectProperty = ns('ObjectProperty');
export const Ontology = ns('Ontology');
export const OntologyProperty = ns('OntologyProperty');
export const ReflexiveProperty = ns('ReflexiveProperty');
export const Restriction = ns('Restriction');
export const SymmetricProperty = ns('SymmetricProperty');
export const Thing = ns('Thing');
export const TransitiveProperty = ns('TransitiveProperty');

export const allValuesFrom = ns('allValuesFrom');
export const backwardCompatibleWith = ns('backwardCompatibleWith');
export const complementOf = ns('complementOf');
export const differentFrom = ns('differentFrom');
export const disjointUnionOf = ns('disjointUnionOf');
export const disjointWith = ns('disjointWith');
export const distinctMembers = ns('distinctMembers');
export const equivalentClass = ns('equivalentClass');
export const equivalentProperty = ns('equivalentProperty');
export const hasValue = ns('hasValue');
export const imports = ns('imports');
export const incompatibleWith = ns('incompatibleWith');
export const intersectionOf = ns('intersectionOf');
export const inverseOf = ns('inverseOf');
export const minCardinality = ns('minCardinality');
export const onProperty = ns('onProperty');
export const oneOf = ns('oneOf');
export const priorVersion = ns('priorVersion');
export const propertyChainAxiom = ns('propertyChainAxiom');
export const propertyDisjointWith = ns('propertyDisjointWith');
export const sameAs = ns('sameAs');
export const unionOf = ns('unionOf');
export const versionIRI = ns('versionIRI');
export const versionInfo = ns('versionInfo');

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
  AllDifferent,
  AsymmetricProperty,
  InverseFunctionalProperty,
  IrreflexiveProperty,
  NamedIndividual,
  ReflexiveProperty,
  Thing,
  backwardCompatibleWith,
  complementOf,
  differentFrom,
  disjointUnionOf,
  disjointWith,
  distinctMembers,
  equivalentClass,
  imports,
  incompatibleWith,
  intersectionOf,
  priorVersion,
  propertyChainAxiom,
  propertyDisjointWith,
  sameAs,
  versionIRI,
  versionInfo,
};

