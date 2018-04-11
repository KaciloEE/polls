import gql from 'graphql-tag';

export default gql`
mutation createPoll($title: String) {
  createPoll(title:$title) {
    id
  }
  }
`;
