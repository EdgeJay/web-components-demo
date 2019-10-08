const { createWebpackConfig } = require('../configs/webpack.base');

const base = createWebpackConfig({
  folder: __dirname,
  pageTitle: '04 - Simple State Management | Web Components Demo',
});

module.exports = {
  ...base,
};
