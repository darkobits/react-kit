import { describe, it, expect, vi } from 'vitest';


const mockedRender = vi.fn();

const mockedCreateRoot = vi.fn(() => ({
  render: mockedRender,
  unmount: vi.fn()
}));

vi.mock('react-dom/client', () => {
  return {
    createRoot: mockedCreateRoot
  };
});

const { render } = await import('./render');

describe('render', () => {
  describe('when provided a non-existent DOM node', () => {
    it('should throw', async () => {
      expect(() => {
        render('foo', {} as JSX.Element);
      }).toThrow('could not be found');
    });
  });

  describe('when provided an existing DOM node', () => {
    it('should not throw', () => {
      const App = {} as JSX.Element;
      const rootEl = document.createElement('div');
      rootEl.id = 'root';
      document.body.append(rootEl);

      expect(() => {
        render('#root', App);
      }).not.toThrow();

      expect(mockedCreateRoot).toHaveBeenCalledWith(rootEl);
      expect(mockedRender).toHaveBeenLastCalledWith(App);
    });
  });
});
