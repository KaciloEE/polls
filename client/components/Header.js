import React from 'react';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, NavItem, NavLink
} from 'reactstrap';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{query}]
    });
  }

  renderButtons() {
    const {loading, user} = this.props.data;
    if (loading) {
      return <div/>;
    }

    if (user) {
      return (
        <Nav className="ml-auto" navbar>
          <ul className="nav justify-content-end nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to='/dashboard' activeClassName='active'>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/search' activeClassName='active'>Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/mypolls' activeClassName='active'>My Question</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/answers' activeClassName='active'>My Answers</Link>
            </li>
          </ul>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      )
    } else {
      return (
        <div className="ml-auto">
          <Link to="/login" className="btn btn-outline-primary">SignIn</Link>{' '}
          <Link to="/signup" className="btn btn-outline-primary">SignUp</Link>{' '}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">GraphQL Dashboard App</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            {this.renderButtons()}
          </Collapse>
        </Navbar>
        <br/>
      </div>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
);