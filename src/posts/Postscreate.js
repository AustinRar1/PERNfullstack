import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container,Row, Col } from 'reactstrap';
import APIURL from '../helpers/enviroment.js';

class PostCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            item: ''
        };
    }
    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/share/create/`, {
            method: 'POST',
            body: JSON.stringify({ shareData: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((response) => response.json())
        .then((logData) => {
            this.props.updatePostsArray();
            this.setState({
                id: '',
                item: ''
            })
        })
    }
    render() {
        return (
            <div>
            <hr />
            <Container>
            <Form onSubmit={this.handleSubmit} >
                <FormGroup>
                    <Input Cols="30" Rows="4" id="item" type="text" name="item" value={this.state.item} placeholder="enter Post" onChange={this.handleChange} required/>
                </FormGroup>
                <Button type="submit" color="primary"> Submit </Button>
            </Form>
            </Container>
            </div>
        )
    }
}
export default PostCreate;