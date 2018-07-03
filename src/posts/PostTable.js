import React from 'react';
import { Table, Button } from 'reactstrap';
import '../style/post.css'
const PostTable = (props) => {
    console.log(props)
    return (
        <div>
             <h3>Posts History</h3>
            <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Posts</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    props.post.map((post, id) => {
                        return (
                            <tr key={id}>
                                <th>{post.id}</th>
                                <td>{post.sharedata}</td>
                                <td>
                            
                            <Button id={post.id} onClick={props.delete} color="danger">Delete</Button>|
                            <Button id={post.id} onClick={e => props.update(e, post)} color="warning">Update</Button>
                </td>
            </tr>
        )
    })}
                </tbody>
            </Table>
        </div>
    )
}

export default PostTable;