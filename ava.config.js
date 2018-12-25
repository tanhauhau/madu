export default {
  babel: {
    testOptions: {
      plugins: ['./packages/babel-transform-madu/index.js'],
    },
  },
  files: ['packages/*/test/**/*.js'],
};
