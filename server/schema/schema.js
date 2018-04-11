const graphql = require('graphql');
const {GraphQLSchema} = graphql;

const query = require('./types/rootQueryType');
const mutation = require('./mutations');
const subscriptions = require('./subscriptions');

module.exports = new GraphQLSchema({
  query,
  mutation,
  subscriptions
});
