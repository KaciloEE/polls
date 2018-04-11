import React, { Component } from 'react';
import {FormGroup, Input, Button, Row, Col} from 'reactstrap';

class AuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', name: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <Row>
            <Col sm={{ size: 6, order: 2, offset: 1 }}>
            <form onSubmit={this.onSubmit.bind(this)} className="col s6">                
                {this.props.type ? '' :
                    <FormGroup>
                        <Input
                            required
                            placeholder="John Doe"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </FormGroup>
                }
                    <FormGroup>
                        <Input
                            required
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                    </FormGroup>
                        <FormGroup>

                            <Input
                                placeholder="Password"
                                type="password"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                        
                    </FormGroup>
                    <div className="errors">
                        {this.props.errors.map(error => <div key={error}>{error}</div>)}
                    </div>
                    <Button color="primary" size="lg">Submit</Button>
                </form>
            </Col>
                
            </Row>
        );
    }
}

export default AuthForm;