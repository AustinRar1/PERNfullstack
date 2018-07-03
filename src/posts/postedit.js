import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';


class PostEdit extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            item:''
        };
    }
    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.update(event, this.state)
    }
    componentWillMount(){
        console.log(this.props.post)
        this.setState({
            id: this.props.post.id,
            item: this.props.post.sharedata
        })
    }
    render() {
        return (
            <div>
                <Modal isOpen={true} > 
                <ModalHeader>Post something!</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup>
                            <Label for="item">Notes</Label>
                            <Input id="item" type="textarea" name="item" value={this.state.item} placeholder="enter post" onChange={this.handleChange} />
                        </FormGroup>
                        <Button type="submit" color="primary"> Submit </Button>
                    </Form>
                </ModalBody>
            </Modal>
            </div>
        )
    }
}

export default PostEdit;