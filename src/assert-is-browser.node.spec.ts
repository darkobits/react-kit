// @vitest-environment node

import { describe, it, expect } from 'vitest';

import { assertIsBrowser } from './assert-is-browser';


describe('assertIsBrowser', () => {
  describe('when not in a browser environment', () => {
    it('should throw', () => {
      expect(() => {
        assertIsBrowser();
      }).toThrow('Not in a browser');
    });
  });

  describe('when a label is provided', () => {
    it('should use the provided label', () => {
      expect(() => {
        assertIsBrowser('someFunction');
      }).toThrow('[someFunction] Not in a browser');
    });
  });
});
