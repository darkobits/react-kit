/**
 * @private
 *
 * Base-64 encoded 1x1 transparent PNG.
 */
const emptyPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';


/**
 * @private
 *
 * <style> element that sets the cursor to the above image.
 */
const hideCursorElement = document.createElement('style');
hideCursorElement.setAttribute('type', 'text/css');
hideCursorElement.innerHTML = `*, *:before, *:after { cursor: url(${emptyPng}), auto !important; }`;


/**
 * Hides the mouse cursor by appending a <style> element to the document.
 */
export function hideCursor() {
  if (!hideCursorElement.parentElement) document.head.append(hideCursorElement);
}


/**
 * Shows the mouse cursor by removing the <style> element applied by
 * `hideCursor`.
 */
export function showCursor() {
  if (hideCursorElement.parentElement) hideCursorElement.remove();
}
