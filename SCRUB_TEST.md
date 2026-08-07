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
https://naominix.github.io/xcratch-scrub-test/editor/?extension=https%3A%2F%2Fnaominix.github.io%2Fxcx-irobot-root%2FirobotRoot.mjs%3Fv%3D7ed644b&extension=https%3A%2F%2Fmicrobit-more.github.io%2Fdist%2FmicrobitMore.mjs
```

The extensions are loaded sequentially in the order in which they appear in
the URL. This avoids extension registration races and gives deterministic
behavior when multiple extensions are requested.

This is a test deployment, not an official Xcratch distribution.

## Included extensions

The following extensions are shown in the extension library. They are not
activated at startup; select the extension button and click an item to load it.

- MicroBit More v2
- iRobot Root
- AkaDako (Grove2Scratch)
- PoseNet2Scratch
- TM2Scratch
- TMPose2Scratch
- Scratch2Maqueen
- Speech2Scratch

MicroBit More v2, iRobot Root, and AkaDako are downloaded during the build and
packaged into the site. The remaining five extensions are built into Scratch VM
and are loaded only when selected. In particular, PoseNet2Scratch uses the same
`ml5@0.12.2` dependency strategy as Stretch3 instead of loading the external
Rollup bundle. This prevents TensorFlow.js kernel registries from being split
across incompatible copies, which caused the `FromPixels` WebGL error.

Camera, microphone, Bluetooth, and internet permissions are still requested as
needed by each extension.

### TM2Scratch and TMPose2Scratch

Do not activate TM2Scratch and TMPose2Scratch in the same editor session. Their
upstream machine-learning libraries require incompatible TensorFlow.js stacks;
Stretch3 documents the same limitation. Reload the editor before switching
between these two extensions.

## Upstream extension sources

See [THIRD_PARTY_EXTENSIONS.md](THIRD_PARTY_EXTENSIONS.md) for source and
license information.
