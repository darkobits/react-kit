<picture>
	<source
    media="(prefers-color-scheme: dark)"
    srcset="https://github.com/darkobits/react-kit/assets/441546/a6b7c185-1475-4757-aaa3-0e5d0edbd7d8"
    width="100%"
  >
	<img
    src="https://github.com/darkobits/react-kit/assets/441546/07116892-a45f-49cf-9303-a9102f18e925"
    width="100%"
  >
</picture>
<p align="center">
  <a
    href="https://www.npmjs.com/package/@darkobits/react-kit"
  ><img
    src="https://img.shields.io/npm/v/@darkobits/react-kit.svg?style=flat-square"
  ></a>
  <a
    href="https://github.com/darkobits/react-kit/actions?query=workflow%3Aci"
  ><img
    src="https://img.shields.io/github/actions/workflow/status/darkobits/react-kit/ci.yml?style=flat-square"
  ></a>
  <a
    href="https://app.codecov.io/gh/darkobits/react-kit/branch/master"
  ><img
    src="https://img.shields.io/codecov/c/github/darkobits/react-kit/master?style=flat-square&color=brightgreen"
  ></a>
  <a
    href="https://depfu.com/github/darkobits/react-kit"
  ><img
    src="https://img.shields.io/depfu/darkobits/react-kit?style=flat-square"
  ></a>
  <a
    href="https://conventionalcommits.org"
  ><img
    src="https://img.shields.io/static/v1?label=commits&message=conventional&style=flat-square&color=398AFB"
  ></a>
</p>

# Install

```
npm install --save @darkobits/react-kit
```

# Use

- [`render`](#render)
- [`assertIsBrowser`](#assertisbrowser)
- [`setCssVariable`](#setcssvariable)
- [`hideCursor` / `showCursor`](#hidecursor--showcursor)
- [`injectScript`](#injectscript)
- [`jsonToBase64` / `base64ToJson`](#jsontobase64--base64tojson)
- [`getPlatformDetails`](#getplatformdetails)
- [`isMobile`](#ismobile)
- [`isStandalone`](#isstandalone)
- [`prefetchImage`](#prefetchimage)

---

### `render`

```ts
// Import
import { render } from '@darkobits/react-kit/render';
// Signature
function render(selector: string, element: JSX.Element): () => void;
```

Shorthand for rendering a React root at the provided selector using `react-dom/client`. This function
performs the following actions:

1. Use `document.querySelector` to locate the target element indicated by `selector`.
2. If no element was found, throw.
3. Create a root using `createRoot`.
4. Call `root.render`, passing the provided `element`.
5. Return the root's `unmount` function.

> ⚠️ This package declares `react-dom` as a peer dependency. However, you should still install
> `react-dom` as a dependency of your project, even if your package manager automatically installs peer
> dependencies.

> `index.tsx`

```tsx
import { render } from '@darkobits/react-kit/render';
import { App } from './App';
render('#root', <App />);
```

---

### `assertIsBrowser`

```ts
// Import
import { assertIsBrowser } from '@darkobits/react-kit/assert-is-browser';
// Signature
function assertIsBrowser(label?: string): void;
```

Ensures the current context is a browser environment. Throws an error otherwise. Useful for writing
functions that interact with browser APIs.

```ts
export function reticulateSplines() {
  assertIsBrowser();
  // Safely interact with window, document, etc.
}
```

This function accepts an optional argument, `label`, that will be used as a prefix in the error message
should the function throw:

```ts
export function reticulateSplines() {
  assertIsBrowser('reticulateSplines');
  // Safely interact with window, document, etc.
}
```

This will throw errors with the message: `[reticulateSplines] Not in a browser environment.`

---

### `setCssVariable`

```ts
// Import
import { setCssVariable } from '@darkobits/react-kit/css-variable';
// Signature
function setCssVariable(varName: string, value: any, scope = ':root'): void;
```

Sets a CSS variable on all elements matching the provided `scope`. The default scope is `:root`, which
is equivalent to the `html` element.

```ts
// Set on <html>, available globally.
setCssVariable('--color', 'rgba(128, 128, 128, 0.6)');

// Only set on element(s) matching the provided selector.
setCssVariable('--color', 'rgba(128, 128, 128, 0.6)', '.my-element');

// To unset a variable, set its value to "unset".
setCssVariable('--color', 'unset');
```

---

### `hideCursor` / `showCursor`

```ts
// Import
import { hideCursor, showCursor } from '@darkobits/react-kit/hide-cursor';
// Signatures
function hideCursor(): void;
function showCursor(): void;
```

Hides the cursor by adding a `<style>` tag to the `<head>` that sets the cursor to an image of a 1px by
1px transparent PNG. The cursor may be shown again by calling `showCursor`, which removes the `<style>`
tag.

```ts
// To hide the cursor:
hideCursor();

// To show the cursor again:
showCursor();
```

---

### `emit`

```ts
// Import
import { emit } from '@darkobits/react-kit/emit';
// Signature
function emit(eventName: string, eventData?: any): void;
```

Emits a [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) on the `window`
with optional event data. Event data will be assigned to the `detail` property of the `CustomEvent`.

**Type-Safe Events**

To add type-safety to this function as well as `window.addEventListener` and `window.dispatchEvent`,
create a file with the `.d.ts` extension (`globals.d.ts` is common) in your project with the following:

```ts
interface WindowEventMap {
  'my-custom-event': CustomEvent<{
    kittens: true
  }>;
}
```

The interface `WindowEventMap` is what `addEventListener` and `dispatchEvent` use to look-up known event
names and their corresponding data. This definition will be _merged_ with the global definition,
effectively `extend`-ing it.

---

### `injectScript`

```ts
// Import
import { injectScript } from '@darkobits/react-kit/inject-script';
// Signature
function injectScript(src: string, attrs?: OptionalAttributes): Promise<void>
```

Facilitates loading external scripts at runtime by injecting a `<script>` tag into the `<head>`. Returns
a Promise that resolves when the script has finished loading. By default, the script's `type` is set to
`text/javascript` and its `async` flag is set to `true`. An optional second argument may be provided to
override these settings and set additional attributes.

```ts
await injectScript('https://code.jquery.com/jquery-3.3.1.min.js');

await injectScript('https://code.jquery.com/jquery-3.3.1.min.js', {
  integrity: 'sha384-tsQFqpEReu7ZLhBV2VZlAu7zcOV+rXbYlF2cqB8txI/8aZajjp4Bqd+V6D5IgvKT',
  crossOrigin: 'anonymous'
});
```

---

### `jsonToBase64` / `base64ToJson`

```ts
// Import
import { jsonToBase64, base64ToJson } from '@darkobits/react-kit/json-base64';
// Signatures
function jsonToBase64(value: any): string;
function base64ToJson(value: string): any;
```

`jsonToBase64` serializes the provided JSON value as a base-64-encoded string. `base64ToJson`
deserializes a similarly-encoded value.

```ts
jsonToBase64({ kittens: true }) //=> 'eyJraXR0ZW5zIjp0cnVlfQ=='
base64ToJson('eyJraXR0ZW5zIjp0cnVlfQ==') //=> { kittens: true }
```

---

### `getPlatformDetails`

```ts
// Import
import { getPlatformDetails } from '@darkobits/react-kit/platform';
// Signature
function getPlatformDetails(): Bowser.Parser.ParsedResult;
```

Returns details about the current browser, operating system, device, and rendering engine using
[`bowser`](https://github.com/lancedikson/bowser). This function creates a `bowser` parser, parses the
current user agent string, then caches and returns the result. Subsequent invocations return the cached
result.

Example result:

```ts
{
  browser: {
    name: 'Internet Explorer'
    version: '11.0'
  },
  os: {
    name: 'Windows'
    version: 'NT 6.3'
    versionName: '8.1'
  },
  platform: {
    type: 'desktop'
  },
  engine: {
    name: 'Trident'
    version: '7.0'
  }
}
```

---

### `isMobile`

```ts
// Import
import { isMobile } from '@darkobits/react-kit/platform';
// Signature
function isMobile(): boolean;
```

Calls `getPlatformDetails` (see above) and returns `true` if the platform type is either `mobile` or
`tablet`.

---

### `isStandalone`

```ts
// Import
import { isStandalone } from '@darkobits/react-kit/platform';
// Signature
function isStandalone(): boolean;
```

Returns `true` if the page is currently being displayed in [standalone](https://web.dev/learn/pwa/app-design/#standalone-experience)
mode, relevant for Progressive Web Apps.

---

### `prefetchImage`

```ts
// Import
import { prefetchImage } from '@darkobits/react-kit/prefetch-image';
// Signature
function prefetchImage(imgUrl?: string): Promise<string>;
```

Pre-fetches an image by creating a new `Image`. Returns a promise that resolves with the provided URL
when the image has finished loading. Useful for avoiding flicker / loading when adding images to the DOM
dynamically.

If this function is provided a falsy value, it will resolve with an empty string.

> ⚠️ This function is memoized; subsequent invocations using the same URL will return the first value.

```ts
getImageUrlSomehow()
  .then(prefetchImage)
  .then(doSomethingWithImageUrl);
```

<picture>
  <img
    src="https://user-images.githubusercontent.com/441546/189774318-67cf3578-f4b4-4dcc-ab5a-c8210fbb6838.png"
    style="max-width: 100%;"
  >
</picture>
