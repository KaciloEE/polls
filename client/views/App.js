import React from 'react';
import {Link} from 'react-router';
import Header from '../components/Header';
import {Container, Jumbotron } from 'reactstrap';

const App = (props) => {
  return (
    <Container>
      <Header/>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Vote board</h1>
          <p className="lead">CREATE AND SHARE POLLS WITH FRIENDS.</p>
          <p className="lead">
            <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
          </p>
        </Container>
      </Jumbotron>

    </Container>
  );
};

export default App;