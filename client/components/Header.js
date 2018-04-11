import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
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
            refetchQueries: [{ query }]
        });
    }
    renderButtons() {
        const { loading, user } = this.props.data;

        // if (this.props.data.loading) {
        if (loading) {
            return <div />;
        }

        if (user) {
            return (
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Options
                    </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <Link to="/dashboard">Dashboard</Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link to="/mypolls">My Question</Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link to="/answers">My Answers</Link>
                            </DropdownItem>
                            <DropdownItem divider />
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
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {this.renderButtons()}
                    </Collapse>
                </Navbar>
                <br />
            </div>
        );
    }
}

export default graphql(mutation)(
    graphql(query)(Header)
);