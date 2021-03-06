import React from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/MyQuestions';
import mutationVote from '../mutations/Vote';
import CreatePoll from '../components/CreatePoll';
import {Row, Col} from 'reactstrap';
import Question from '../components/Question';


class MyQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {errors: []};
    this.onVote = this.onVote.bind(this);
  }

  onVote(idPoll, idVote, e) {
    this.props.mutate({
      variables: {idPoll, idVote},
      refetchQueries: [{query}]
    })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({errors});
      });
  }

  render() {
    const polls = this.props.data.myQuestion
    const user = this.props.data.user

    return (
      <div>
        <Row>
          <Col>
            <CreatePoll/>
          </Col>
        </Row>
        <Row>
          <Question errors={this.state.errors} data={polls} onVote={this.onVote} user={user}/>
        </Row>
      </div>
    );
  }
}

export default graphql(mutationVote)(
  graphql(query)(MyQuestion)
);