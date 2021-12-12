/**
 * querySelector
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
export const qs = (selector, scope) => (
  (scope || document).querySelector(selector)
);

/**
 * addEventListener
 *
 * @param {Element|Window} target Target Element
 * @param {string} eventType Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
export const $on = (target, eventType, callback, capture) => {
  target.addEventListener(eventType, callback, !!capture);
};
