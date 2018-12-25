const { Fragment } = require('./enum');

function renderString(tagName, attributes, ...children) {
  if (tagName === Fragment) {
    return flattenArray(children);
  } else if (typeof tagName === 'string') {
    let result = '';
    result += `<${tagName}`;
    if (attributes) {
      Object.keys(attributes).forEach(key => {
        result += ` ${cleanAttribute(key)}="${attributes[key]}"`;
      });
    }
    result += '>';
    result += flattenArray(children);
    result += `</${tagName}>`;
    return result;
  } else if (typeof tagName === 'function') {
    return tagName(Object.assign(attributes, { children }));
  }
  return '';
}

function flattenArray(possiblyArray) {
  if (Array.isArray(possiblyArray)) {
    return possiblyArray.map(flattenArray).join('');
  }
  return possiblyArray;
}

const attributeReplacements = {
  className: 'class',
};

function cleanAttribute(attributeKey) {
  return attributeReplacements[attributeKey] || attributeKey;
}

module.exports = renderString;
