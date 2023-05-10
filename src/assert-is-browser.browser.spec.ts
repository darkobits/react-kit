// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';

import { assertIsBrowser } from './assert-is-browser';


describe('assertIsBrowser', () => {
  describe('when in a browser environment', () => {
    it('should not throw', () => {
      expect(() => {
        assertIsBrowser();
      }).not.toThrow();
    });
  });
});
