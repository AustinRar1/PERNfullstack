import React, { Component } from 'react';
import PostsIndex from '../posts/PostsIndex';
import '../style/post.css'
const Splash = (props) => {
  return (
      <div>
          <PostsIndex token={props.sessionToken}/>
      </div>
  ) 
}

export default Splash;