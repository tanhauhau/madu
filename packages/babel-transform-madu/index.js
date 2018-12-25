const { default: babelPlugin } = require('@babel/plugin-transform-react-jsx');

module.exports = function declare(api, options) {
  return babelPlugin(
    api,
    Object.assign({}, options, {
      pragma: 'Madu.renderString',
      pragmaFrag: 'Madu.Fragment',
    })
  );
};