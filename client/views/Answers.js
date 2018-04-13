import React from 'react';
import Header from '../components/Header';
import MyAnswers from '../containers/MyAnswers';
import {Container} from 'reactstrap';

const Answers = (props) => {
  return (
    <Container>
      <Header/>
      <MyAnswers/>
    </Container>
  );
}

export default Answers;
