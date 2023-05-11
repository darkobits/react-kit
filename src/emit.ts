/* eslint-disable no-redeclare */
export type UnwrapCustomEvent<E> = E extends CustomEvent<infer D> ? D : never;


/**
 * Emits a `CustomEvent` on `window`. Optional event data may be provided, which
 * will be available at the `detail` property of the `CustomEvent`.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 */
export function emit<E extends keyof WindowEventMap>(eventName: E, eventData?: UnwrapCustomEvent<WindowEventMap[E]>): void;
export function emit(eventName: string, eventData?: any): void;
export function emit(eventName: string, eventData?: any) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: eventData }));
}
