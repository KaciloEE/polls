const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);

const { graphqlExpress,graphiqlExpress } = require('apollo-server-express');
const { createServer } = require('http');
//const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const bodyParser = require('body-parser');
const cors = require('cors');

const schema = require('./schema/schema');


// Create a new Express application
const app = express();
app.use('*', cors({ origin: 'http://localhost:4000', credentials: true }));
const PORT = 4000;

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://localhost:27017/polsssss';

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

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


//app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphql', bodyParser.json(), (req, res, next) => {  
  return graphqlExpress({
    schema,
    context: req,//{ user: req.session.passport.user },
    tracing: true,
    cacheControl: true,
  })(req, res, next);
});

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql', subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`, }));

// app.use('/graphql', expressGraphQL({
//   schema,
//   graphiql: true
// }));

// app.use('/graphql', graphqlExpress({
//   schema
// }));

// app.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
//   subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
// }));

// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));


// app.listen(4000, () => {
//   console.log('Listening');
// });

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