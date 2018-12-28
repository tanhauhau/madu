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

module.exports = {
  cleanAttribute,
  cleanResult,
};
