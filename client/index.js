import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {addGraphQLSubscriptions} from 'add-graphql-subscriptions';

import {Router, hashHistory, Route} from 'react-router';

import App from './views/App';
import Dashboard from './views/Dashboard';
import MyPolls from './views/MyPolls';
import Answers from './views/Answers';

import LoginForm from './containers/LoginForn';
import SignupForm from './containers/SignupForm';
import requireAuth from './containers/requireAuth';


const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
  reconnect: true
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);
const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id
});


const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="signup" component={SignupForm}/>
        <Route path="login" component={LoginForm}/>
        <Route path="dashboard" component={requireAuth(Dashboard)}/>
        <Route path="mypolls" component={requireAuth(MyPolls)}/>
        <Route path="answers" component={requireAuth(Answers)}/>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root/>, document.querySelector('#root'));
