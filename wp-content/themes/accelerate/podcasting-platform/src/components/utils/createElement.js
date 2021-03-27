function isSVG(element) {
  const patt = new RegExp(`^${element}$`, 'i');
  const SVGTags = ['path', 'svg', 'use', 'g', 'line', 'circle'];
  return SVGTags.some((tag) => patt.test(tag));
}

/**
 * @param {Element} parent
 * @param {Element} child
 */
const appendChild = (parent, child) => {
  if (Array.isArray(child)) child.forEach((nestedChild) => appendChild(parent, nestedChild));
  else {
    parent.appendChild(
      child.nodeType ? child : document.createTextNode(child),
    );
  }
};
/**
 *
 * @param {string} tag
 * @param {*} props
 * @param  {Element[]} children
 * @returns {Element}
 */
export default function createElement(tag, props, ...children) {
  const element = isSVG(tag)
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag);

  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window) element.addEventListener(name.toLowerCase().substr(2), value);
    else element.setAttribute(name, value.toString());
  });
  if (children.length > 0) {
    children.forEach((child) => {
      if (child !== undefined) {
        appendChild(element, child);
      } else {
        appendChild(element, 'undefined');
      }
    });
  }

  return element;
}
