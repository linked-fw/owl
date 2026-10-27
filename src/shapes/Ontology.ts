import { ShapeSet } from '@_linked/core/collections/ShapeSet';
import {
  createPropertyShape,
  literalProperty,
  objectProperty,
} from '@_linked/core/shapes/SHACL';
import type { NodeReferenceValue } from '@_linked/core/utils/NodeReference';
import { Prefix } from '@_linked/core/utils/Prefix';
import { Resource } from '@_linked/rdfs/shapes';
import * as dcterms from '@_linked/dcmi/ontologies/dcterms';
import * as owl from '../ontologies/owl.js';
import * as meta from '../ontologies/metadata-terms.js';
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

  /** The ontology's version information (`owl:versionInfo`), a single statement. */
  @literalProperty({
    path: owl.versionInfo,
    maxCount: 1,
  })
  get versionInfo(): string {
    return '';
  }

  /** The ontology's name (`dcterms:title`), one title. */
  @literalProperty({
    path: dcterms.title,
    maxCount: 1,
  })
  get title(): string {
    return '';
  }

  /** What the ontology covers (`dcterms:description`), one description. */
  @literalProperty({
    path: dcterms.description,
    maxCount: 1,
  })
  get description(): string {
    return '';
  }

  /**
   * The prefix the ontology prefers for its namespace (`vann:preferredNamespacePrefix`), its
   * Turtle prefix. Not `prefix` or `declaredPrefix`, which are the SHACL prefix declaration.
   */
  @literalProperty({
    path: meta.preferredNamespacePrefix,
    maxCount: 1,
  })
  get preferredNamespacePrefix(): string {
    return '';
  }

  /** The namespace of the ontology's terms (`vann:preferredNamespaceUri`), as a literal. */
  @literalProperty({
    path: meta.preferredNamespaceUri,
    maxCount: 1,
  })
  get preferredNamespaceUri(): string {
    return '';
  }

  /** Who made the ontology (`dcterms:creator`), one WebID or other IRI. */
  @objectProperty({
    path: dcterms.creator,
    maxCount: 1,
  })
  get creator(): NodeReferenceValue {
    return null;
  }

  /** Who contributed to the ontology (`dcterms:contributor`), any number of IRIs. */
  @objectProperty({
    path: dcterms.contributor,
  })
  get contributor(): NodeReferenceValue[] {
    return [];
  }

  /** Who maintains the ontology (`schema:maintainer`), any number of IRIs. */
  @objectProperty({
    path: meta.maintainer,
  })
  get maintainer(): NodeReferenceValue[] {
    return [];
  }

  /**
   * The stage the ontology is at (`adms:status`), one IRI: `core:Draft`, `core:ReadyForReview`
   * or `core:Published` (`coreOntology` in `@_linked/core`).
   */
  @objectProperty({
    path: meta.status,
    maxCount: 1,
  })
  get status(): NodeReferenceValue {
    return null;
  }

  /** The ontologies this ontology imports (`owl:imports`: "other ontologies"), any number. */
  get imports(): ShapeSet<Ontology> {
    return new ShapeSet<Ontology>();
  }

  /** The version IRI of this ontology (`owl:versionIRI`: "the version IRI"). */
  get versionIRI(): Ontology {
    return null;
  }

  /** The predecessor of this ontology (`owl:priorVersion`: "the predecessor ontology"). */
  get priorVersion(): Ontology {
    return null;
  }

  /** The ontologies this one is backward compatible with (`owl:backwardCompatibleWith`), any number. */
  get backwardCompatibleWith(): ShapeSet<Ontology> {
    return new ShapeSet<Ontology>();
  }

  /** The ontologies this one is incompatible with (`owl:incompatibleWith`), any number. */
  get incompatibleWith(): ShapeSet<Ontology> {
    return new ShapeSet<Ontology>();
  }
}

// Self-referencing properties (their range is owl:Ontology), created after the class exists.
createPropertyShape({ path: owl.imports, shape: Ontology }, 'imports', shacl.IRI, Ontology);
createPropertyShape(
  { path: owl.versionIRI, shape: Ontology, maxCount: 1 },
  'versionIRI',
  shacl.IRI,
  Ontology
);
createPropertyShape(
  { path: owl.priorVersion, shape: Ontology, maxCount: 1 },
  'priorVersion',
  shacl.IRI,
  Ontology
);
createPropertyShape(
  { path: owl.backwardCompatibleWith, shape: Ontology },
  'backwardCompatibleWith',
  shacl.IRI,
  Ontology
);
createPropertyShape(
  { path: owl.incompatibleWith, shape: Ontology },
  'incompatibleWith',
  shacl.IRI,
  Ontology
);
