module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    jsx: true,
  },
  plugins: [require.resolve('eslint-plugin-react')],
  settings: {
    react: {
      createClass: 'renderString',
      pragma: 'Madu',
    },
  },
};
