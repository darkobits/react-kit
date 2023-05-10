/**
 * Throws an error if called outside of a browser context.
 */
export function assertIsBrowser(label?: string) {
  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined' &&
    typeof window.document !== 'undefined'
  ) return;

  throw new Error(`[${label ?? 'assertIsBrowser'}] Not in a browser environment.`);
}
