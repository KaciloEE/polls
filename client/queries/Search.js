import gql from 'graphql-tag';

export default gql`
query searchPoll($title: String){
  searchPoll(title: $title) {
    id
    title
    tags
    author
    authorName
    date
    pollTotal
    option {
      name
      votes
      id
    }
    answer
  }
  user {
    id
  }
}
`;