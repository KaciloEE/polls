const express = require('express');
const mongoose = require('mongoose');
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

const app = express();
const PORT = 4000;

app.use('*', cors({origin: `http://localhost:${PORT}`, credentials: true}));

const MONGO_URI = 'mongodb://localhost:27017/polls';

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo instance.'))
  .on('error', error => console.log('Error connecting to Mongo:', error));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
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