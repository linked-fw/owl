/**
 * The terms `Ontology`'s metadata accessors use from vocabularies this package does not depend
 * on, named by IRI. Dublin Core's terms come from `@_linked/dcmi`; VANN and ADMS have no Linked
 * package, and `@_linked/schema` would pull in React, so `schema:maintainer` is named here too.
 */
import {createNameSpace} from '@_linked/core/utils/NameSpace';

const vann = createNameSpace('http://purl.org/vocab/vann/');
const adms = createNameSpace('http://www.w3.org/ns/adms#');
const schema = createNameSpace('http://schema.org/');

/** The prefix an ontology prefers for its namespace (`vann:preferredNamespacePrefix`). */
export const preferredNamespacePrefix = /*#__PURE__*/ vann('preferredNamespacePrefix');

/** The namespace of an ontology's terms (`vann:preferredNamespaceUri`). */
export const preferredNamespaceUri = /*#__PURE__*/ vann('preferredNamespaceUri');

/** The status of an asset, such as an ontology (`adms:status`). */
export const status = /*#__PURE__*/ adms('status');

/** A person or organization that maintains a work (`schema:maintainer`). */
export const maintainer = /*#__PURE__*/ schema('maintainer');
