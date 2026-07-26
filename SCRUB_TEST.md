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

This is a test deployment, not an official Xcratch distribution.
