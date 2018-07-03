import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PostsCreate from 'C:/Users/ajrar/Documents/JavaScriptMay2018/Projects/PERNfullStack/voidStart/voidstart1/src/posts/Postscreate.js';
import PostTable from 'C:/Users/ajrar/Documents/JavaScriptMay2018/Projects/PERNfullStack/voidStart/voidstart1/src/posts/PostTable.js';
import PostEdit from './postedit';
import '../style/post.css'
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
       delete={this.deletePosts} update={this.setUserPost} /> : <h2>Log a workout to see table</h2>
        return (
            <div>
                <Container>
                    <Row>
                        <Col md="3">
                        <PostsCreate token={this.props.token} updatePostsArray={this.fetchPosts}/>
                        </Col>
                            <Col md="9">
                                <h2>Log a forum to see table</h2>
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