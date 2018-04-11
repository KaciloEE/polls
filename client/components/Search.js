import React from 'react';
import {
  Row, Button, Form, FormGroup, Label, Input
} from 'reactstrap';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {errors: [], search: ''};
  }

  onSubmit(e) {
    e.preventDefault()
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
              onChange={e => this.setState({search: e.target.value})}
            />
          </FormGroup>
          <Button color="primary" size="lg" block>Search....</Button>
        </Form>
      </Row>
    );
  }
}

export default Search;