const { createWebpackConfig } = require('../configs/webpack.base');

const base = createWebpackConfig({
  folder: __dirname,
  pageTitle: '04 - Typescript | Web Components Demo',
  entryMain: 'index.ts',
});

module.exports = {
  ...base,
};
