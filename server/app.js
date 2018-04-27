const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const config = require('./config');

const {app: {PORT}, db: {host, port, name}} = config;
const app = express();

app.use('*', cors({origin: `http://localhost:${PORT}`, credentials: true}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: `mongodb://${host}:${port}/${name}`,
    autoReconnect: true
  })
}));

app.use(passport.initialize());
app.use(passport.session());

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
