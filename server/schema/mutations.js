const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;
const UserType = require('./types/userType');
const AuthService = require('../services/auth');
const PollType = require('./types/pollsType');
const mongoose = require('mongoose');
const PollModel = mongoose.model('polls');
const socket = require('../schema/socket');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPoll: {
      type: PollType,
      args: {
        title: {type: GraphQLString}
      },
      resolve: (root, {title}, req) => {
        return new Promise((resolve, reject) => {
          const data = {title, author: req.user.id, authorName: req.user.name}
          const newEvent = new PollModel(data);
          newEvent
            .save()
            .then(data => {
              socket.publish('EVENT_CREATED', {
                eventCreated: data
              });

              resolve(data)
            })
            .catch(errors => reject(errors));
        })
      }
    },
    Vote: {
      type: PollType,
      args: {
        idPoll: {type: GraphQLString},
        idVote: {type: GraphQLString}
      },
      resolve(parentValue, {idPoll, idVote}, req) {
        PollModel.update({_id: idPoll}, {$inc: {"pollTotal": 1}, $push: {"answer": req.user.id}}, function () {
        });
        PollModel.update({_id: idPoll, "option._id": idVote}, {$inc: {"option.$.votes": 1}}, function () {
        });
        return true
      }
    },
    signup: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        name: {type: GraphQLString}
      },
      resolve(parentValue, {email, password, name}, req) {
        return AuthService.signup({email, password, name, req})
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const {user} = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      resolve(parentValue, {email, password}, req) {
        return AuthService.login({email, password, req});
      }
    }
  }
});

module.exports = mutation;