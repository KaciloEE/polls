import React from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/Questions';
import mutationPoll from '../mutations/Poll';
import {Row, Input, Button} from 'reactstrap';


class CreatePoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {errors: [], question: ''};
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.mutate({
      variables: {title: this.state.question},
      refetchQueries: [{query}]
    }).then(() => this.setState({question: ''}))
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({errors});
      });
  }

  render() {
    return (
      <Row>
        <form onSubmit={this.onSubmit.bind(this)} className="col s6">
          <div className="input-field">
            <Input
              required
              bsSize="lg"
              placeholder="Question"
              value={this.state.question}
              onChange={e => this.setState({question: e.target.value})}
            />
          </div>
          <div className="errors">
            {this.state.errors.map(error => <div key={error}>{error}</div>)}
          </div>
          <Button color="primary" size="lg" block>Create new Poll</Button>
          <br/>
        </form>
      </Row>
    )
  }
}

export default graphql(mutationPoll)(
  graphql(query)(CreatePoll)
);