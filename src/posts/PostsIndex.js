import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PostsCreate from '../posts/Postscreate.js';
import PostTable from '../posts/PostTable.js';
import PostEdit from './postedit';
import APIURL from '../helpers/enviroment.js';
class PostsIndex extends Component{
    constructor(props){
        super(props)
        this.state = {
            post: [],
            updatePressed: false,
            postToUpdate: {}
        }
    } 
    componentDidMount() {
        this.fetchPosts()
    }
    fetchPosts =() =>{
        fetch(`${APIURL}/share/getall`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res)=>res.json())
          .then((logData)=>{
              return this.setState({post: logData})
          })
    }
    deletePosts =(event) =>{
        fetch(`${APIURL}/share/delete/${event.target.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res)=> this.fetchPosts())
          
    }
    updatePost = (event, post) => {
        console.log(post)
        fetch(`${APIURL}/share/update/${post.id}`,{
                method: 'PUT',
                body: JSON.stringify({ shareData: post }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            })
                .then((res) => {
                    this.setState({ updatePressed: false })
                    this.fetchPosts();
                })
    }
    setUserPost = (event, post) => {
        this.setState({
            postToUpdate: post,
            updatePressed: true
        })
    }
    render(){
        const post = this.state.post.length >= 1 ? 
      <PostTable post={this.state.post}
       delete={this.deletePosts} update={this.setUserPost} /> : <h2>You have no posts yet!</h2>
        return (
            <div>
                <Container>
                    <Row>
                        <Col md="3">
                        <PostsCreate token={this.props.token} updatePostsArray={this.fetchPosts}/>
                        </Col>
                            <Col md="9">
                                <h3>Share assets, ideas, news, or even an engine!</h3>
                                <br/>
                                {post}
                            </Col>
                    </Row>
                    <Col md="12">
                    {
                        this.state.updatePressed ? <PostEdit t={this.state.updatePressed} update={this.updatePost} post={this.state.postToUpdate} />
                        :<div></div>
                    }
                    </Col>
                </Container>
            </div>
        )
    }
}

export default PostsIndex;