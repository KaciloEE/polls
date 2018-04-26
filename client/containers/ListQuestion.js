import React from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/Questions';
import mutationVote from '../mutations/Vote';
import {Row} from 'reactstrap';
import Question from '../components/Question';


class ListQuestion extends React.Component {
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
    const {user} = this.props.data
    const {dataList} = this.props

    return (
      <Row>
        <Question errors={this.state.errors} data={dataList} onVote={this.onVote}
                  user={user}/>
      </Row>
    );
  }
}

export default graphql(mutationVote)(
  graphql(query)(ListQuestion)
);