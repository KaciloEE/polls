import gql from 'graphql-tag';

export default gql`
{
  searchPoll(title:String) {
    id
    title
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