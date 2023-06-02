// @vitest-environment jsdom

import { cleanup, render, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { lazy } from './lazy';


afterEach(cleanup);


describe('lazy', () => {
  describe('using a named export that maps to a React component', () => {
    // @ts-ignore; File is outside `rootDir`.
    const { First } = lazy(async () => import('../fixtures/Components'));

    it('should return a proxy React component', () => {
      expect(First.$$typeof.toString()).toBe('Symbol(react.forward_ref)');
    });

    it('should render the component', async () => {
      const { getByText } = render(<First />);
      await waitFor(() => getByText('First'));
    });
  });
});
