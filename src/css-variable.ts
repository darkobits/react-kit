/**
 * @private
 *
 * Unwraps CSS variable names.
 *
 * @example
 *
 * parseCssVariable('var(--foo)') => '--foo'
 */
function parseCssVariable(input: string) {
  return input.replace(/var\(/g, '').replace(/\)/g, '');
}


/**
 * Converts a string into a CSS class selector unless that string is:
 * - already a class selector
 * - already a pseudo-class selector
 */
export function parseClassName(input: string) {
  if (input.startsWith(':') || input.startsWith('.')) return input;
  return `.${input}`;
}


/**
 * Sets the provided CSS variable to the provided value. Accepts an optional
 * scope. Automatically parses CSS variable names created using vanilla-extract.
 *
 * Pass `false`, `null`, or `undefined` to unset a variable.
 */
export function setCssVariable(varName: string, value: any, scope = ':root') {
  const parsedVarName = parseCssVariable(varName);

  const elements = document.querySelectorAll<HTMLElement>(scope);
  if (elements.length === 0) return;

  const finalValue = [false, null, undefined].includes(value) ? 'unset' : value;

  elements.forEach(element => {
    element.style?.setProperty(parsedVarName, finalValue);
  });
}
