import React from 'react';
import Header from '../components/Header';
//import CreatePoll from '../components/CreatePoll';
import MyAnswers from '../components/MyAnswers';
import { Container } from 'reactstrap';

const Answers = (props) => {    
        return (
            <Container>
                <Header />
                <MyAnswers />                                
            </Container>
        );   
}

export default Answers;
