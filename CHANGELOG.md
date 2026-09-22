# @\_linked/owl

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
