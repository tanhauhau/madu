const attributeReplacements = {
  className: 'class',
};

function cleanAttribute(attributeKey, attributeValue) {
  let key = attributeReplacements[attributeKey] || attributeKey;
  let value = attributeValue;

  if (key === 'style') {
    value = convertStyleToString(attributeValue);
  }

  return { key, value };
}

function convertStyleToString(objectOrString) {
  if (typeof objectOrString === 'string') {
    return objectOrString;
  } else if (typeof objectOrString === 'object') {
    return Object.keys(objectOrString)
      .map(key => {
        let value = objectOrString[key];
        if (typeof value === 'number') {
          value = value + 'px';
        }
        return camelCaseToDashCase(key) + ':' + value + ';';
      })
      .join('');
  } else {
    return '';
  }
}

function camelCaseToDashCase(str) {
  return str.replace(
    /[A-Z]/g,
    (s, index) => (index > 0 ? '-' : '') + s.toLowerCase()
  );
}

function cleanResult(result) {
  if (result === true || result === false || result === null) {
    return '';
  }
  return result;
}

module.exports = {
  cleanAttribute,
  cleanResult,
};
