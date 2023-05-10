import { describe, it, expect, afterEach } from 'vitest';

import {
  hideCursor,
  showCursor
} from './hide-cursor';


afterEach(() => {
  while (document.head.firstChild) document.head.firstChild.remove();
});


describe('hideCursor / showCursor', () => {
  it('should add and remove a <style> tag from the <head>', () => {
    expect(document.head.childNodes.length).toBe(0);

    hideCursor();
    expect(document.head.childNodes.length).toBe(1);

    // Ensures we don't add another <style> tag if called multiple times.
    hideCursor();
    expect(document.head.childNodes.length).toBe(1);

    showCursor();
    expect(document.head.childNodes.length).toBe(0);
  });
});
