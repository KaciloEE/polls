import React from 'react';
import {withApoll, connect, graphql} from 'react-apollo';
import query from '../queries/Questions';
import {Container, Row, Button, Form, Input, Col, Alert} from 'reactstrap';
import ListQuestion from '../containers/ListQuestion';
import Header from '../components/Header';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);    
  }   

  componentWillReceiveProps(nextProps) {
    this.props.data.refetch()
  }  

  render() {        

    return (
      <Container>
        <Header/>
        <Row>                    
          <ListQuestion dataList={this.props.data.polls} />                
        </Row>
      </Container>
    );

  }
}

export default graphql(query)(Dashboard);
