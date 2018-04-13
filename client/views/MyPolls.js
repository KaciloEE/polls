import React from 'react';
import Header from '../components/Header';
import MyQuestion from '../containers/MyQuestion';
import {Container} from 'reactstrap';

const MyPolls = (props) => {
  return (
    <Container>
      <Header/>
      <MyQuestion/>
    </Container>
  );
}

export default MyPolls;
