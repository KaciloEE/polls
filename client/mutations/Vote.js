import gql from 'graphql-tag';

export default gql`
mutation Vote($idPoll: String, $idVote: String) {
  Vote(idPoll:$idPoll, idVote:$idVote) {
    id
  }
  }
`;