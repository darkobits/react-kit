import { createRoot } from 'react-dom/client';

import { assertIsBrowser } from './assert-is-browser';


/**
 * Renders a React app at the indicated selector using the provided element and
 * returns the root's `unmount` method.
 */
export function render(selector: string, element: JSX.Element) {
  assertIsBrowser('render');

  const container = document.querySelector(selector);
  if (!container) throw new Error(`[render] Element matching selector "${selector}" could not be found.`);

  const root = createRoot(container);
  root.render(element);

  return root.unmount.bind(root);
}
