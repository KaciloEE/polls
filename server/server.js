const {createServer} = require('http');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const bodyParser = require('body-parser');
const {execute, subscribe} = require('graphql');
const models = require('./models');
const schema = require('./schema/schema');
const config = require('./config');
const app = require('./app');
const {app: {PORT}} = config;
require('./db');

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