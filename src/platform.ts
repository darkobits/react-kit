import Bowser from 'bowser';

import { assertIsBrowser } from './assert-is-browser';


/**
 * @private
 *
 * Bowser parser instance.
 */
let parser: Bowser.Parser.Parser;


/**
 * @private
 *
 * Cached result from `bowser`.
 */
let browserResult: Bowser.Parser.ParsedResult;


/**
 * Returns information about the user's browser, OS, and platform.
 */
export function getPlatformDetails() {
  assertIsBrowser('getPlatformDetails');

  if (!parser) parser = Bowser.getParser(window.navigator.userAgent);
  if (!browserResult) browserResult = parser.getResult();

  return browserResult;
}


/**
 * Returns `true` if the current platform is a tablet or other mobile device.
 */
export function isMobile() {
  assertIsBrowser('isMobile');

  const details = getPlatformDetails();
  if (!details.platform.type) return false;
  return ['tablet', 'mobile'].includes(details.platform.type);
}


/**
 * Returns `true` if in a "standalone" context (ie: a PWA opened from the home
 * screen).
 */
export function isStandalone() {
  assertIsBrowser('isStandalone');

  return Boolean(Reflect.get(navigator, 'standalone'));
}
