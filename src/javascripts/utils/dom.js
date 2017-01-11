/**
 * Returns closest element by selector
 *
 * @param {Element} element Element
 * @param {string} selector CSS selector
 * @returns {Element|null} Closest element or null if not found
 */
export function closest (element, selector) {
    let el = element;

    while (el && el.matches) {
        if (el.matches(selector)) return el;
        el = el.parentNode;
    }

    return null;
}


export default {
    closest
};
