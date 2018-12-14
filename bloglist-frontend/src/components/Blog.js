import React from 'react'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Jumbotron, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Comments from '../components/Comments'

class Blog extends React.Component {
    likeBlog = (blog) => () => {
        this.props.likeBlog(blog)
    }

    deleteBlog = (blog) => () => {
        this.props.removeBlog(blog)
        this.props.history.push('/')
        this.props.notify(`Blog ${blog.title} was removed!`)
    }

    showDeleteForBlog = (blog) => {
        if (!blog.user._id) { 
            return true
        }
        if (blog.user._id === this.props.user.id) {
            return true
        }
        return false
    } 

    render() {
        const showWhenVisible = { display: this.showDeleteForBlog(this.props.blog) ? '' : 'none' }
        
        return(
            <div>
                <Jumbotron>
                    <h1>
                        <strong>{this.props.blog.title}</strong> <small>{this.props.blog.author}</small>
                    </h1>                                      
                    <div>
                            <p><a href={this.props.blog.url}>{this.props.blog.url}</a></p>
                            <p>{this.props.blog.likes} likes </p>
                            <p>added by 
                                {
                                    !this.props.blog.user 
                                        ? 'anonymous' 
                                        : <Link to={`/users/${this.props.blog.user._id}`}>{this.props.blog.user.name}</Link>
                                }
                            </p>
                            <Button bsStyle="primary" onClick={this.likeBlog(this.props.blog)}>like</Button>&nbsp;
                            <Button style={showWhenVisible} bsStyle="danger" onClick={this.deleteBlog(this.props.blog)}>delete blog</Button>
                    </div>
                </Jumbotron>
                <Comments blog={this.props.blog}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.loggedUser,
        blog: state.blogs.filter(blog => blog.id === ownProps['blogId'])[0]
    }
}
  
export default connect(
    mapStateToProps,
    {
        likeBlog,
        removeBlog,
        notify
    }
)(Blog)