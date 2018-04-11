import React from 'react';
import Header from '../components/Header';
import CreatePoll from '../components/CreatePoll';
import ListQuestion from '../components/ListQuestion';
import Search from '../components/Search';
import { Container } from 'reactstrap';

const Dashboard = (props) => {    
        return (
            <Container>
                <Header />                
                <br/>
                <CreatePoll />
                <br/>                
                <ListQuestion/>
            </Container>
        );   
}

export default Dashboard;
