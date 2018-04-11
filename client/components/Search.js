import React from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/Search';
import {
  Row, Card, CardImg, CardTitle, CardSubtitle, Button, CardColumns, Form, FormGroup, Label, Input
} from 'reactstrap';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [], search: '' };    
  }    
  onSubmit(e) {
    e.preventDefault()        
    // this.props.query({
    //   variables: { search: this.state.search },
    //   refetchQueries: [{ query }]
    // }).then(() => this.setState({ search: '' }))
    //   .catch(res => {
    //     const errors = res.graphQLErrors.map(error => error.message);
    //     this.setState({ errors });
    //   });
  }

  render() {      

    return (
      <Row>
        <Form onSubmit={this.onSubmit.bind(this)}>
        <FormGroup>
          <Label for="exampleSearch">Search</Label>          
          <Input
             type="search"                           
              placeholder="search"
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
            />            
        </FormGroup>
        <Button color="primary" size="lg" block>Search....</Button>
        </Form>        
      </Row>
    );
  }
}

export default Search;