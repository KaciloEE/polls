const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

let selectType = new GraphQLObjectType({
  name: 'selectType',
  fields: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    votes: {type: GraphQLInt}
  }
});

const PollType = new GraphQLObjectType({
  name: 'PollType',
  fields: {
    id: {type: GraphQLID},
    author: {type: GraphQLID},
    authorName: {type: GraphQLString},
    title: {type: GraphQLString},
    date: {type: GraphQLString},
    pollTotal: {type: GraphQLInt},
    option: {type: new GraphQLList(selectType)},
    answer: {type: new GraphQLList(GraphQLID)}
  }
});

module.exports = PollType;
