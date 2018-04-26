import gql from 'graphql-tag';

export default gql`
{
  polls {
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