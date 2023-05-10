import {
  describe,
  it,
  expect,
  afterEach,
  vi
} from 'vitest';


afterEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});


describe('getPlatformDetails', () => {
  it('should return a bowser result', async () => {
    const { getPlatformDetails } = await import('./platform');
    const result = getPlatformDetails();

    // These are mocked JSDOM defaults.
    expect(result.browser.name).toBe('Safari');
    expect(result.engine.name).toBe('Blink');
  });
});


describe('isMobile', () => {
  const iPhone = 'Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1';
  const iPad = 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.12 Mobile/11A465 Safari/8536.25 (3B92C18B-D9DE-4CB7-A02A-22FD2AF17C8F)';
  const macBookPro = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';

  describe('when on a mobile device', () => {
    it('should return true', async () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(iPhone);
      const { isMobile } = await import('./platform');
      expect(isMobile()).toBe(true);
    });
  });

  describe('when on a tablet', () => {
    it('should return true', async () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(iPad);
      const { isMobile } = await import('./platform');
      expect(isMobile()).toBe(true);
    });
  });

  describe('on all other devices', () => {
    it('should return false', async () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(macBookPro);
      const { isMobile } = await import('./platform');
      expect(isMobile()).toBe(false);
    });
  });
});


describe('isStandalone', () => {
  describe('when in standalone mode', () => {
    it('should return true', async () => {
      Object.defineProperty(window.navigator, 'standalone', {
        value: true,
        configurable: true
      });
      const { isStandalone } = await import('./platform');
      expect(isStandalone()).toBe(true);
    });
  });

  describe('when not in standalone mode', () => {
    it('should return false', async () => {
      Object.defineProperty(window.navigator, 'standalone', {
        value: false,
        configurable: true
      });
      const { isStandalone } = await import('./platform');
      expect(isStandalone()).toBe(false);
    });
  });
});
