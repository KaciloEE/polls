import React from 'react';
import {withApollo} from 'react-apollo';
import query from '../queries/Search';
import {Container, Row, Button, Form, Input, Col, Alert} from 'reactstrap';
import ListQuestion from '../containers/ListQuestion';
import Header from '../components/Header';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {search: '', filters: [], visible: false};

    this._executeSearch = this._executeSearch.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({visible: false});
  }

  _executeSearch(e) {
    e.preventDefault();
    this.props.client.query({
      query: query,
      variables: {"title": this.state.search},
    }).then(res => {
      const visible = res.data.searchPoll.length ? false : true
      this.setState({filters: res.data.searchPoll, visible})
    })
  }

  render() {
    return (
      <Container>
        <Header/>
        <Row>
          <Col>
            <Form inline onSubmit={this._executeSearch}>
              <Input
                size="60"
                bsSize="lg"
                type="search"
                placeholder="Search"
                value={this.state.search}
                onChange={e => this.setState({search: e.target.value})}
              />&nbsp;
              <Button outline color="primary" size="lg"> Search...</Button>
            </Form>
          </Col>
        </Row>
        <br/>
        <Row>
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            Search not found!
          </Alert>
          <ListQuestion dataList={this.state.filters}/>
        </Row>
      </Container>
    );

  }
}

export default withApollo(Search);