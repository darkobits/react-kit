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
 * Converts CSS class names from vanilla-extract into valid CSS selectors.
 */
export function parseClassName(input: string) {
  if (input.startsWith(':') || input.startsWith('.')) return input;
  return `.${input}`;
}


/**
 * Sets the provided CSS variable to the provided value. Accepts an optional
 * scope. Automatically parses CSS variable names created using vanilla-extract.
 */
export function setCssVariable(varName: string, value: any, scope = ':root') {
  const parsedVarName = parseCssVariable(varName);
  const elements = document.querySelectorAll<HTMLElement>(scope);
  if (elements.length === 0) return;

  elements.forEach(element => {
    element.style?.setProperty(parsedVarName, value);
  });
}
