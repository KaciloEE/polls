const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'Usertype',
  fields: {
    id: {type: GraphQLID},
    email: {type: GraphQLString},
    name: {type: GraphQLString}
  }
});

module.exports = UserType;