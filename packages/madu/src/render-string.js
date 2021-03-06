const { Fragment } = require('./enum');

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

async function renderHTML(tagName, attributes, children) {
  const result = [];
  result.push(`<${tagName}`);
  if (attributes) {
    Object.keys(attributes).forEach(key => {
      result.push(` ${cleanAttribute(key)}="${attributes[key]}"`);
    });
  }
  result.push('>');
  if (children) {
    result.push(await flattenArray(children));
  }
  result.push(`</${tagName}>`);
  return result.join('');
}

function renderComponent(tagName, attributes, children) {
  const props = Object.assign({}, attributes, { children });
  return Promise.resolve(tagName(props)).then(cleanResult);
}

function flattenArray(possiblyArray) {
  if (Array.isArray(possiblyArray)) {
    return Promise.all(possiblyArray.map(flattenArray)).then(resolvedArrays =>
      resolvedArrays.join('')
    );
  }
  return cleanResult(possiblyArray);
}

const attributeReplacements = {
  className: 'class',
};

function cleanAttribute(attributeKey) {
  return attributeReplacements[attributeKey] || attributeKey;
}

function cleanResult(result) {
  if (result === true || result === false || result === null) {
    return '';
  }
  return result;
}

module.exports = renderString;
