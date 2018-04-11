import gql from 'graphql-tag';

export default gql`
{
  answers {
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