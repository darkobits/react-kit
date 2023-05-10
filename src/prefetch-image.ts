/**
 * @private
 *
 * Tracks URLs of images we have pre-fetched.
 */
const prefetchedImages = new Map<string, Promise<string>>();


/**
 * Asynchronously pre-loads the image at the provided URL and returns a promise
 * that resolves when the image has finished loading.
 *
 * To make promise-chaining easier, the promise will resolve with the URL
 * provided.
 */
export async function prefetchImage(imgUrl?: string) {
  if (!imgUrl) return '';

  if (!prefetchedImages.has(imgUrl)) {
    // Optimistically add the URL to our Set. This prevents multiple attempts to
    // pre-fetch the same URL before the first fetch completes.
    prefetchedImages.set(imgUrl, new Promise<string>((resolve, reject) => {
      const img = new Image();

      img.addEventListener('load', () => resolve(imgUrl));

      img.addEventListener('error', event => {
        prefetchedImages.delete(imgUrl);
        reject(event.error);
      });

      // N.B. Setting this property will cause the browser to fetch the image.
      img.src = imgUrl;
    }));
  }

  return prefetchedImages.get(imgUrl) as Promise<string>;
}
