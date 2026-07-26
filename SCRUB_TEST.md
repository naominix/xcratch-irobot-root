# Xcratch Scrub marker test

This repository is an experimental build of Xcratch for verifying Scratch Link integration in the App Store version of Scrub on iPadOS.

The only runtime behavior change from the upstream `xcratch` branch is an empty marker element in the initial HTML:

```html
<script id="scratch-link-extension-script"></script>
```

Scrub checks for this marker when the document finishes loading. If present, Scrub publishes its native Scratch Link socket to the page. Xcratch and extensions can then use the standard socket without modifying the Scrub application.

The test editor is deployed from `packages/scratch-gui/build` to the `editor/` directory of the `gh-pages` branch.

Expected URL:

`https://naominix.github.io/xcratch-scrub-test/editor/`

## Loading multiple extensions

Repeat the `extension` query parameter to load more than one extension. Each
extension URL must be percent-encoded independently:

```text
https://naominix.github.io/xcratch-scrub-test/editor/?extension=<encoded-extension-url-1>&extension=<encoded-extension-url-2>
```

For example, this loads iRobot Root and MicroBit More:

```text
https://naominix.github.io/xcratch-scrub-test/editor/?extension=https%3A%2F%2Fnaominix.github.io%2Fxcx-irobot-root%2FirobotRoot.mjs&extension=https%3A%2F%2Fmicrobit-more.github.io%2Fdist%2FmicrobitMore.mjs
```

The extensions are loaded sequentially in the order in which they appear in
the URL. This avoids extension registration races and gives deterministic
behavior when multiple extensions are requested.

This is a test deployment, not an official Xcratch distribution.
