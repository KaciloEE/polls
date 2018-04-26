const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {createServer} = require('http');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {execute, subscribe} = require('graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./models');
const schema = require('./schema/schema');
const config = require('./config');
require('./db');

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

app.use('/graphql', bodyParser.json(), (req, res, next) => {
  return graphqlExpress({
    schema,
    context: req,
    tracing: true,
    cacheControl: true,
  })(req, res, next);
});

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

const server = createServer(app);

server.listen(PORT, err => {
  if (err) throw err;

  new SubscriptionServer({
    schema,
    execute,
    subscribe,
    onConnect: () => console.log('Client connected')
  }, {
    server,
    path: '/subscriptions'
  });

  console.log(`> Ready on PORT ${PORT}`);
});