import { connect } from 'react-redux'
import React from 'react'
import Notification from './Notification'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogForm from './BlogForm'


class BlogList extends React.Component {

    render() {
        return(
            <div>
                <Notification />
                <p>{this.props.user.name} logged in <button onClick={this.props.logout}>logout</button></p>
                <Togglable buttonLabel="add blog">
                    <BlogForm 
                        // addBlog={this.addBlog}
                        // handleChange={this.handleFieldChange}
                        // newTitle={this.state.newTitle}
                        // newAuthor={this.state.newAuthor}
                        // newUrl={this.state.newUrl}
                    />
                </Togglable>
                <h2>blogs</h2> 
                {this.props.blogs.sort(this.compareLikes).map(blog => // sort blogs in descending order by likes
                    <Blog 
                        id={blog.id} 
                        key={blog.id} 
                        // blog={blog} 
                        // addLike={this.addLike(blog.id)}
                        // removeBlog={this.removeBlog(blog.id)}
                        // showDelete={this.showDeleteForBlog(blog)}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.loggedUser
    }
}

export default connect(mapStateToProps)(BlogList)