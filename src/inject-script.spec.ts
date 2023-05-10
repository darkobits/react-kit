import { describe, it, expect, afterEach } from 'vitest';

import { injectScript } from './inject-script';


afterEach(() => {
  while (document.head.firstChild) document.head.firstChild.remove();
});


// Note: JSDOM will not actually fetch resources.
describe('injectScript', () => {
  const src = 'https://wikipedia.com';

  it('should add a <script> tag to the document <head>', async () => {
    expect(document.head.childNodes.length).toBe(0);
    void injectScript(src);
    expect(document.head.childNodes.length).toBe(1);
  });

  describe('providing optional attributes', () => {
    const crossOrigin = 'anonymous';
    const integrity = 'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo';

    it('should set the provided attributes', () => {
      void injectScript(src, { crossOrigin, integrity });

      const scriptEl = document.querySelector('script');
      expect(scriptEl?.crossOrigin).toBe(crossOrigin);
      expect(scriptEl?.integrity).toBe(integrity);
    });
  });
});
