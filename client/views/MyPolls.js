import React from 'react';
import Header from '../components/Header';
//import CreatePoll from '../components/CreatePoll';
import MyQuestion from '../components/MyQuestion';
import { Container } from 'reactstrap';

const MyPolls = (props) => {    
        return (
            <Container>
                <Header />                
                <MyQuestion />
            </Container>
        );   
}

export default MyPolls;
