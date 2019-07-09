const { createWebpackConfig } = require('../configs/webpack.base');

const base = createWebpackConfig({
  folder: __dirname,
  pageTitle: '03 - Typescript | Web Components Demo',
});

module.exports = {
  ...base,
};
