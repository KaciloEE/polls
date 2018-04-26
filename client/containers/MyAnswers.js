import React from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/MyAnswers';
import {Row} from 'reactstrap';
import Question from '../components/Question';

class MyAnswers extends React.Component {

  constructor(props) {
    super(props);

    this.state = {errors: []};
  }

  componentWillReceiveProps(nextProps) {
    this.props.data.refetch()
  }

  render() {
    const polls = this.props.data.answers
    const user = this.props.data.user

    return (
      <Row>
        <Question errors={this.state.errors} data={polls} user={user}/>
      </Row>
    );
  }
}

export default (graphql(query)(MyAnswers));
