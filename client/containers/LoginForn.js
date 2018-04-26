import React from 'react';
import AuthForm from '../components/AuthForm';
import mutation from '../mutations/Login';
import {graphql} from 'react-apollo';
import query from '../queries/CurrentUser';
import {hashHistory} from 'react-router';
import {Container} from 'reactstrap';
import Header from '../components/Header';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {errors: []};
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({email, password}) {
    this.props.mutate({
      variables: {email, password},
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
          <h3>Login</h3>
          <AuthForm type="login" errors={this.state.errors} onSubmit={this.onSubmit.bind(this)}/>
        </div>
      </Container>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(LoginForm)
);