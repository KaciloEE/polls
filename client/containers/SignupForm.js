import React, {Component} from 'react';
import AuthForm from '../components/AuthForm';
import {graphql} from 'react-apollo';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import {hashHistory} from 'react-router';
import {Container} from 'reactstrap';
import Header from '../components/Header';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {errors: []};
  }

  componentWillUpdate(nextProps) {
    if (nextProps.data.user && !this.props.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({email, password, name}) {
    this.props.mutate({
      variables: {email, password, name},
      refetchQueries: [{query}]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({errors});
    });
  }

  render() {
    return (
      <Container>
        <Header/>
        <div>
          <h3>Sign Up</h3>
          <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)}/>
        </div>
      </Container>

    );
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm)
);