import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../style/login.css'
import APIURL from '../helpers/enviroment.js';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        };
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmit = (event) => {
        fetch(`${APIURL}1/users/signin`, {
            method: 'POST',
            body: JSON.stringify({users:this.state}),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.setToken(data.sessionToken)
        }) 
        event.preventDefault()
    }
    render() {
        return (
            <div>
                <h1 className="Login">Login</h1>
                <h6>Already sharing your creations? Login!</h6>
                <br></br>
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input id="li_username" type="text" name="username" placeholder="enter username" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="li_password" type="password" name="password" placeholder="enter password" onChange={this.handleChange} />
                    </FormGroup>
                    <button  typeof="submit" onSubmit={this.handleSubmit}>Submit</button>
                </Form>
            </div>
        )
    }
}
export default Login;