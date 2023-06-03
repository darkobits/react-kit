import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { prefetchImage } from './prefetch-image';

/**
 * A reference to the original Image class.
 */
const originalImage = window.Image;


/**
 * Tracks instances of MockImage.
 */
const mockedImages = new Set<MockImage>();


/**
 * Mock image class used during testing.
 */
class MockImage extends EventTarget {
  constructor() {
    super();
    mockedImages.add(this);
  }
}


beforeEach(() => {
  Object.defineProperty(window, 'Image', { value: MockImage });
});

afterEach(() => {
  Object.defineProperty(window, 'Image', { value: originalImage });
  mockedImages.clear();
});


describe('prefetchImage', () => {
  describe('when provided an empty string', () => {
    it('should resolve with an empty string', async () => {
      expect(await prefetchImage('')).toBe('');
    });
  });

  describe('when provided a falsy value', () => {
    it('should resolve with an empty string', async () => {
      expect(await prefetchImage()).toBe('');
      // @ts-expect-error
      expect(await prefetchImage(false)).toBe('');
      // @ts-expect-error
      expect(await prefetchImage(null)).toBe('');
      // @ts-expect-error
      expect(await prefetchImage(0)).toBe('');
    });
  });

  describe('when provided with a unique URL', () => {
    it('should create a new Image and resolve with its URL when it loads', async () => {
      expect(mockedImages.size).toBe(0);

      const imageUrl = 'https://google.com';
      const resultPromise = prefetchImage(imageUrl);

      expect(mockedImages.size).toBe(1);

      mockedImages.forEach(mockImage => mockImage.dispatchEvent(new CustomEvent('load')));

      const result = await resultPromise;
      expect(result).toBe(imageUrl);
    });
  });

  // N.B. This test relies on the state created by the previous test.
  // Specifically, the module-local in-memory cache used by prefetchImage to
  // remember what URLs it has seen before.
  describe('when provided with a previously-used URL', () => {
    it('should immediately resolve with the provided URL', async () => {
      expect(mockedImages.size).toBe(0);

      const imageUrl = 'https://google.com';
      const resultPromise = prefetchImage(imageUrl);

      expect(mockedImages.size).toBe(0);

      mockedImages.forEach(mockImage => mockImage.dispatchEvent(new CustomEvent('load')));

      const result = await resultPromise;
      expect(result).toBe(imageUrl);
    });
  });

  describe('when an error occurs', () => {
    it('should reject with the Error', async () => {
      expect.assertions(1);

      const imageUrl = 'https://this-should-throw.com';
      const resultPromise = prefetchImage(imageUrl);

      const error = new Error('test');
      const errorEvent = new ErrorEvent('error', { error });

      mockedImages.forEach(mockImage => mockImage.dispatchEvent(errorEvent));

      try {
        await resultPromise;
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });
});
