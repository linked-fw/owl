# @\_linked/owl

## 1.4.0

### Minor Changes

- [#30](https://github.com/linked-fw/owl/pull/30) [`aa36cbb`](https://github.com/linked-fw/owl/commit/aa36cbb2954f4b483568248d97a51ad6290103e4) Thanks [@flyon](https://github.com/flyon)! - Require `@_linked/core@^2.22.8` (was `^2.0.1`), and pin it in the lockfile.

  The declared range was wide enough that the resolved core depended on whatever the
  consumer — or this repo's own CI, via `package-lock.json` — happened to install. Core
  decides how a shape's IRI is minted, so a stale core made this package emit legacy
  `data.lincd.org` IRIs instead of the arch-02 `linked.cm` scheme. Which IRIs a published
  package produces should not be a function of the installer's dependency tree.

  Minor rather than patch: this raises the minimum core a consumer must resolve, so it
  changes what gets installed rather than only what this package does internally.

## 1.3.0

### Minor Changes

- [#28](https://github.com/linked-fw/owl/pull/28) [`19f5fcd`](https://github.com/linked-fw/owl/commit/19f5fcd2467eb2a90de43b106c5d1536627970ce) Thanks [@flyon](https://github.com/flyon)! - Register this package's shapes under the `owl` slug, not `core`

  `src/package.ts` re-exported core's decorators instead of creating this
  package's own `linkedPackage('@_linked/owl')`, so `@linkedShape` bound to
  `corePackage`. **The shape IRIs change:**

  | Before                                                | After                                                |
  | ----------------------------------------------------- | ---------------------------------------------------- |
  | `https://linked.cm/shape/core/Ontology`               | `https://linked.cm/shape/owl/Ontology`               |
  | `https://linked.cm/shape/core/Restriction`            | `https://linked.cm/shape/owl/Restriction`            |
  | `https://linked.cm/shape/core/Restriction/onProperty` | `https://linked.cm/shape/owl/Restriction/onProperty` |
  | `https://linked.cm/shape/core/Restriction/hasValue`   | `https://linked.cm/shape/owl/Restriction/hasValue`   |

  A shape IRI is persisted data, so this is a minor rather than a patch: anything
  that stored or compared these ids sees new ones. This package's exports also
  move out of core's entry in the package tree and into `@_linked/owl`, which is
  what `Server.call` routes on.

  Closes #26.

## 1.2.0

### Minor Changes

- [#25](https://github.com/linked-fw/owl/pull/25) [`c13a108`](https://github.com/linked-fw/owl/commit/c13a10875c7e7d52d4e6cf27634e34df59dc83c1) Thanks [@flyon](https://github.com/flyon)! - Replace the `lincd-rdfs` dependency with `@_linked/rdfs` (^1.0.0)

  `Ontology` and `Restriction` now import `Resource`/`Property` from
  `@_linked/rdfs/shapes`. This retires the last `lincd` code dependency in the
  framework — `grep -rn lincd src/ lib/` is now empty.

  The inherited shape IRIs move with the package rename:
  `https://linked.cm/shape/lincd-rdfs/Resource` becomes
  `https://linked.cm/shape/rdfs/Resource`, and `Restriction.onProperty` now
  targets `https://linked.cm/shape/rdfs/Property`. No data migration is
  required. `@_linked/owl`'s own exported API is unchanged.

## 1.1.7

### Patch Changes

- [#21](https://github.com/linked-fw/owl/pull/21) [`c7606dc`](https://github.com/linked-fw/owl/commit/c7606dce42e1f0e0e1b1657e61a44b6c5cfa17b2) Thanks [@flyon](https://github.com/flyon)! - The ontology no longer registers by importing itself.

  It carried `import * as _this from './<prefix>.js'` and passed that namespace to
  `linkedOntology()`. Under `tsc` the self-reference survives; under a bundler it does
  not — Rollup treats it as a circular import and elides it, so the binding is
  `undefined` and a consuming app dies at boot with `_this is not defined`.

  Registration now lives in a `<prefix>.register.ts` sibling, imported from the package
  entry. Nothing changes for consumers: importing this package still registers the
  ontology.

## 1.1.6

### Patch Changes

- [#19](https://github.com/linked-fw/owl/pull/19) [`4012442`](https://github.com/linked-fw/owl/commit/4012442bd7f1c6517a54a66a0570f34feca21e85) Thanks [@flyon](https://github.com/flyon)! - Compile the whole `src` folder, and let a bare import resolve under Node10.

  The build only emitted what an entry transitively reached, so any module
  nothing imported was never built — and never type-checked, so it rotted
  quietly. `include` now covers `src/**/*` with tests excluded explicitly.

  `typesVersions` maps every specifier through `lib/esm/*`, so a `types` value
  that already carried that prefix had it applied twice and no consumer on
  classic Node10 resolution could `import` the package by its bare name.

## 1.1.5

### Patch Changes

- [#16](https://github.com/linked-fw/owl/pull/16) [`93004df`](https://github.com/linked-fw/owl/commit/93004dfa393e40e8e58b09568c92cb72df52979b) Thanks [@flyon](https://github.com/flyon)! - Declare npm as the package manager for this repo, convert the build scripts off `yarn`, and mark `package-lock.json` as a generated file.

## 1.1.4

### Patch Changes

- [#14](https://github.com/linked-fw/owl/pull/14) [`f8a41a6`](https://github.com/linked-fw/owl/commit/f8a41a685b411a504ab840c9f6ef93a1c133c8a3) Thanks [@flyon](https://github.com/flyon)! - Exercise the OIDC publish path — no functional change.

## 1.1.3

### Patch Changes

- [#12](https://github.com/linked-fw/owl/pull/12) [`c3db4ff`](https://github.com/linked-fw/owl/commit/c3db4ff91fb17fc914f9cc47b73e71389e3b0fb9) Thanks [@flyon](https://github.com/flyon)! - Exercise the publish path — no functional change.

## 1.1.2

### Patch Changes

- [#10](https://github.com/linked-fw/owl/pull/10) [`6b37fab`](https://github.com/linked-fw/owl/commit/6b37fab35b0f6b6b4e61b941e3b8128ad59a3f2d) Thanks [@flyon](https://github.com/flyon)! - Exercise the OIDC publish path — no functional change.

## 1.1.1

### Patch Changes

- [#8](https://github.com/linked-fw/owl/pull/8) [`2bd5200`](https://github.com/linked-fw/owl/commit/2bd520085d9eaeb5e7df3b6ee5cea0f089f0565d) Thanks [@flyon](https://github.com/flyon)! - Exercise the shared release workflow — no functional change.

## 1.1.0

### Minor Changes

- [`206ba66`](https://github.com/linked-cm/owl/commit/206ba66b825e4cd892a1665c40fd4f3f2737f795) - ESM-only. Dropped the CommonJS build; ships ES modules only (`type: module`, no `require` export condition, no `lib/cjs`). Fixed the root `types` field. CJS consumers on Node 22+ can `require()` it (sync ESM) or use dynamic `import()`.

## 1.0.3

### Patch Changes

- [#3](https://github.com/linked-cm/owl/pull/3) [`e7bed2d`](https://github.com/linked-cm/owl/commit/e7bed2da75c4d61751a9a8fb72f522352f3e3024) Thanks [@flyon](https://github.com/flyon)! - loadData: ESM-only JSON import — drop the dead CJS branch, add the `{ with: { type: 'json' } }` import attribute.

## 1.0.2

### Patch Changes

- [`4aad412`](https://github.com/linked-cm/owl/commit/4aad4127eb056925a9cc4cb7740dba6ebff407b8) - Initial release under the new publishing setup.
