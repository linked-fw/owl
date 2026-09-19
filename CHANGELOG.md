# @\_linked/owl

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
