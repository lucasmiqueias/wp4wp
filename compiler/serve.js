const path = require('path');
const webpack = require('webpack');
const browserSync = require('browser-sync').create();

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config')({ dev: true });
const getPublicPath = require('./publicPath');

const compiler = webpack(config);

const middleware = [
  webpackDevMiddleware(compiler, {
    publicPath: getPublicPath('assets'),
    logLevel: 'silent',
    quiet: true
  }),
  webpackHotMiddleware(compiler, {
    log: false,
    logLevel: 'none'
  })
];

browserSync.init({
  middleware,
  proxy: {
    target: 'http://wp4wp.loc',
    middleware
  },
  logLevel: 'silent',
  files: ['**/*.php'].map(element => path.resolve('../', element))
});