import React from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/MyQuestions';
import mutationPoll from '../mutations/Poll';
import {Row, Input, Button} from 'reactstrap';
import TagsInput from 'react-tagsinput';


class CreatePoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {errors: [], question: '', tags: []};
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.mutate({
      variables: {title: this.state.question, tags: this.state.tags},
      refetchQueries: [{query}]
    }).then(() => this.setState({question: '', tags: []}))
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({errors});
      });
  }

  handleChange(tags) {
    this.setState({tags})
  }

  render() {
    return (
      <Row>
        <form onSubmit={this.onSubmit.bind(this)} className="col">
          <div className="input-field">
            <Input
              required
              bsSize="lg"
              placeholder="Question"
              value={this.state.question}
              onChange={e => this.setState({question: e.target.value})}
            />
            <TagsInput value={this.state.tags} onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="errors">
            {this.state.errors.map(error => <div key={error}>{error}</div>)}
          </div>
          <Button color="primary" size="lg" block>Create Question</Button>
          <br/>
        </form>
      </Row>
    )
  }
}

export default graphql(mutationPoll)(
  graphql(query)(CreatePoll)
);