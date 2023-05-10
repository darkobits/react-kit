/**
 * Encodes the provided JSON-serializable value as a base-64 string.
 */
export function jsonToBase64(value: any) {
  let serializedValue: string;

  try {
    serializedValue = JSON.stringify(value);
  } catch (err: any) {
    throw new Error(`[jsonToBase64] Error serializing value: ${err.message}`, { cause: err });
  }

  return btoa(serializedValue);
}


/**
 * Parses and decodes the provided base-64-encoded JSON value.
 */
export function base64ToJson(value: string) {
  if (typeof value !== 'string')
    throw new TypeError(`[base64ToJson] Expected first argument to be of type "string", got "${typeof value}".`);

  let decodedValue;

  try {
    decodedValue = atob(value);
  } catch (err: any) {
    throw new Error('[base64ToJson] The provided value is not valid base-64.', { cause: err });
  }

  try {
    return JSON.parse(decodedValue);
  } catch (err: any) {
    throw new Error(`[base64ToJson] Error serializing value: ${err.message}`, { cause: err });
  }
}
