import { describe, it, expect, afterEach } from 'vitest';

import {
  parseClassName,
  setCssVariable
} from './css-variable';


afterEach(() => {
  while (document.body.firstChild) document.body.firstChild.remove();
});


describe('parseClassName', () => {
  describe('when provided a pseudo-class selector', () => {
    it('should return the value as-is', () => {
      expect(parseClassName(':root')).toBe(':root');
    });
  });

  describe('when provided a class selector', () => {
    it('should return the value as-is', () => {
      expect(parseClassName('.text-bold')).toBe('.text-bold');
    });
  });

  describe('when provided a plain string', () => {
    it('should return the value as a class selector', () => {
      expect(parseClassName('text-bold')).toBe('.text-bold');
    });
  });
});


describe('setCssVariable', () => {
  const varName = '--testVar';

  describe('when provided a variable name and no scope', () => {
    const varValue = 'rgba(128, 128, 128, 1)';

    it('should set the provided variable on the html element', () => {
      const htmlEl = document.querySelector('html');

      setCssVariable(varName, varValue);

      expect(htmlEl?.style.getPropertyValue(varName)).toBe(varValue);
    });
  });

  describe('when provided a variable name and scope', () => {
    const varValue = 'rgba(50, 100, 200, 1)';

    it('should set the provided variable on all matching elements', () => {
      const testEl = document.createElement('div');
      document.body.append(testEl);

      setCssVariable(varName, varValue, 'div');

      expect(testEl.style.getPropertyValue(varName)).toBe(varValue);
    });
  });

  describe('when provided a wrapped variable name and scope', () => {
    const wrappedVarName = `var(${varName})`;
    const varValue = 'rgba(1, 2, 3, 1)';

    it('should set the provided variable on all matching elements', () => {
      const testEl = document.createElement('div');
      document.body.append(testEl);

      setCssVariable(wrappedVarName, varValue, 'div');

      expect(testEl.style.getPropertyValue(varName)).toBe(varValue);
    });
  });
});
