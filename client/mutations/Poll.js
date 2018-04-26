import gql from 'graphql-tag';

export default gql`
mutation createPoll($title: String, $tags: [String]) {
  createPoll(title:$title, tags:$tags) {
    id
  }
  }
`;
