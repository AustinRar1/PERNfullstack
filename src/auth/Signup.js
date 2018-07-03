import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../style/signup.css'
import APIURL from '../helpers/enviroment.js';
class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        };
    }

handleChange = (event) =>{
    this.setState({
        [event.target.name]: event.target.value
    })
}
handleSubmit = (event) => {
    fetch(`${APIURL}/users/signup`, {
        method: 'POST',
        body: JSON.stringify({users:this.state}),
        headers: new Headers({
            'Content-Type':'application/json'
        })
    }).then(res=>res.json())
        .then((data) => {
        this.props.setToken(data.sessionToken)
    }) 
    event.preventDefault()
}
    render() {
        return (
            <div>
                <h1 className="SignUpSign">Sign Up</h1>
                <h6>Don't have an account? Sign up and join us, check out game assets and dev tools!</h6>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">New Username</Label>
                        <Input id="username" type="text" name="username" placeholder="Enter a Username" onChange={this.handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">New Email</Label>
                        <Input id="su_email" type="email" name="email" placeholder="Enter your Email" onChange={this.handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">New Password</Label>
                        <Input id="su_password" type="password" name="password" placeholder="Enter a Password" onChange={this.handleChange} required/>
                    </FormGroup>
                    <button type="submit"> Submit</button>
                </Form>
            </div>
        )
    }
}
export default Signup;