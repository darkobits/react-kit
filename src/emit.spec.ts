import { describe, it, expect, vi } from 'vitest';

import { emit } from './emit';


describe('emit', () => {
  it('should emit a CustomEvent on window', () => {
    const eventName = 'custom-event';
    const listener = vi.fn();
    window.addEventListener('custom-event', listener);
    emit(eventName);
    expect(listener).toHaveBeenCalled();
  });
});
