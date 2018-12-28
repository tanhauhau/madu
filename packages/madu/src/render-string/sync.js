const { Fragment } = require('../enum');
const { cleanAttribute, cleanResult } = require('./utils');

function renderString(tagName, attributes) {
  const children =
    arguments.length > 3
      ? Array.prototype.slice.call(arguments, 2)
      : arguments[2];

  if (tagName === Fragment) {
    return flattenArray(children);
  } else if (typeof tagName === 'string') {
    return renderHTML(tagName, attributes, children);
  } else if (typeof tagName === 'function') {
    return renderComponent(tagName, attributes, children);
  }
  return '';
}

function renderHTML(tagName, attributes, children) {
  const result = [];
  result.push(`<${tagName}`);
  if (attributes) {
    Object.keys(attributes).forEach(key => {
      result.push(` ${cleanAttribute(key)}="${attributes[key]}"`);
    });
  }
  result.push('>');
  if (children) {
    result.push(flattenArray(children));
  }
  result.push(`</${tagName}>`);
  return result.join('');
}

function renderComponent(tagName, attributes, children) {
  const props = Object.assign({}, attributes, { children });
  return cleanResult(tagName(props));
}

function flattenArray(possiblyArray) {
  if (Array.isArray(possiblyArray)) {
    return possiblyArray.map(flattenArray).join('');
  }
  return cleanResult(possiblyArray);
}

module.exports = renderString;
