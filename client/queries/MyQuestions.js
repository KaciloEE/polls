import gql from 'graphql-tag';

export default gql`
{
  myQuestion {
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