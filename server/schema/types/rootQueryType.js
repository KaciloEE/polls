const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLString} = graphql;
const UserType = require('./userType');
const PollType = require('./pollsType');
const _ = require('lodash');
const mongoose = require('mongoose');
const PollModel = mongoose.model('polls');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    polls: {
      type: new GraphQLList(PollType),
      resolve(args) {
        return PollModel.find({})
      }
    },
    myQuestion: {
      type: new GraphQLList(PollType),
      resolve(parentValue, args, req) {
        return PollModel.find({"author": req.user.id})
      }
    },
    answers: {
      type: new GraphQLList(PollType),
      resolve(parentValue, args, req) {
        return PollModel.find({answer: req.user.id})
      }
    },
    searchPoll: {
      type: new GraphQLList(PollType),
      args: {
        title: {type: GraphQLString}
      },
      resolve(parentValue, args, req) {
        return PollModel.find().or([{title: {$regex: args.title, $options: 'i'}}, {
          tags: {
            $regex: args.title,
            $options: 'i'
          }
        }])
          .then(polls => polls)
          .catch(error => {
            console.log('error', error)
          })
      }
    }
  }
});

module.exports = RootQueryType;
