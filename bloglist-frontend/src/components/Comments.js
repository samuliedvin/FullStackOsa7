import React from 'react'
import { commentBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { FormControl, FormGroup, Button, ControlLabel, ListGroup, ListGroupItem } from 'react-bootstrap'

class Comments extends React.Component {

    addComment = (blog) => (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        this.props.commentBlog(blog, comment)
    }

    render() {
        return(
            <div>
                <h2>Comments</h2>
                <ListGroup>
                    {this.props.blog.comments.map(comment => <ListGroupItem key={this.props.blog.id}>{comment}</ListGroupItem>)}
                </ListGroup>
                <form onSubmit={this.addComment(this.props.blog)}>
                    <FormGroup>
                        <ControlLabel>Add comments</ControlLabel>
                        <FormControl
                            type="text"
                            name="comment"
                        />

                        <Button type="submit">Kommentoi</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

export default connect( 
    null, 
    { 
        commentBlog
    }
)(Comments)