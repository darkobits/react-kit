import { assertIsBrowser } from './assert-is-browser';


type NonFunctionAttributes<O extends Record<any, any>> = {
  [K in keyof O]: O[K] extends (...args: Array<any>) => any
    ? never
    : O[K];
};

type OptionalAttributes = Partial<NonFunctionAttributes<Omit<HTMLScriptElement, 'src'>>>;


/**
 * Injects a <script> tag with the provided URL into the document and returns a
 * Promise that resolves when the script has finished loading.
 */
export async function injectScript(src: HTMLScriptElement['src'], attrs?: OptionalAttributes): Promise<void> {
  assertIsBrowser('injectScript');

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.async = true;

    if (attrs) {
      for (const [name, value] of Object.entries(attrs)) {
        Reflect.set(script, name, value);
      }
    }

    script.addEventListener('load', () => resolve());
    script.addEventListener('error', err => reject(err));
    script.src = src;
    document.head.append(script);
  });
}
