import React from 'react'
import { commentBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { FormControl, FormGroup, Button, ControlLabel, ListGroup, ListGroupItem } from 'react-bootstrap'

class Comments extends React.Component {
    constructor(props ){
        super(props)
        this.state = {
            newComment: ''
        }
    }

    handleChange = (event) => {
        this.setState({ newComment: event.target.value })
    } 

    addComment = (blog) => (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        this.props.commentBlog(blog, comment)
        this.setState({newComment: ''})
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
                            value={this.state.newComment}
                            onChange={this.handleChange}
                        />
                        <Button type="submit">Comment</Button>
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