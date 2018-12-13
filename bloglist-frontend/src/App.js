import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import User from './components/User'
import { notify } from './reducers/notificationReducer'
import { blogInitialization } from './reducers/blogReducer'
import { connect } from 'react-redux'
import { setUser, logout } from './reducers/loggedUserReducer'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, Alert, FormGroup, FormControl, ControlLabel, Button, Navbar, NavItem, Nav, Well, Label, Panel } from 'react-bootstrap'
import BlogList from './components/BlogList'
import Users from './components/Users'
import { userInitialization } from './reducers/usersReducer';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            username: '',
            password: '',
            newTitle: '',
            newUrl: '',
            newAuthor: '',
        }
    }

    async componentDidMount() {
        await this.props.blogInitialization()
        await this.props.userInitialization()
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.props.setUser(user)
            blogService.setToken(user.token)
        }
    } 

    compareLikes = (a, b) => {
        if(a.likes < b.likes) return 1
        if(a.likes > b.likes) return -1
        return 0
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    logout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        this.setState({user: null})
    }

    addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: this.state.newTitle,
            url: this.state.newUrl,
            author: this.state.newAuthor
        }

        blogService
            .create(blogObject)
            .then(newBlog => {
                this.setState({
                    error: `a new blog '${blogObject.title}' by ${blogObject.author} added`,
                    blogs: this.state.blogs.concat(newBlog),
                    newTitle: '',
                    newUrl: '',
                    newAuthor: '',
                })
                setTimeout(() => {
                    this.setState({ error: null })
                }, 2000)  
            })  
    }

    // addLike = (id) => () => {
    //     const blog = this.state.blogs.find(b => b.id === id)
    //     const changedBlog = { ...blog, likes: blog.likes+1 }

    //     blogService
    //         .update(id, changedBlog)
    //         .then(changedBlog => {
    //             this.setState({
    //                 blogs: this.state.blogs.map(blog => blog.id !== id ? blog : changedBlog)
    //         })
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 error: `blog '${blog.title}' has been removed from the server`,
    //                 blogs: this.state.blogs.filter(b => b.id !== id)
    //         })
    //         setTimeout(() => {
    //             this.setState({ error: null })
    //         }, 50000)
    //     })
    // }

    // removeBlog = (id) => () => {
    //     if(window.confirm("are you sure you want to remove the blog?")) {
    //         blogService
    //             .remove(id)
    //             .then(() => {
    //                 blogService
    //                     .getAll()
    //                     .then(blogs => {
    //                         this.setState({ blogs })
    //                     })
    //             } 
    //         )
    //     }
    // }

    showDeleteForBlog = (blog) => {
        if (!blog.user.username) { 
            return true
        }
        if (blog.user.username === this.state.user.username) {
            return true
        }
        return false
    } 

    render() {
        if (this.props.user === null) {
            return (
                <div className="login">
                    <Notification />
                    <Togglable buttonLabel="login">
                        <LoginForm
                            username={this.state.username}
                            password={this.state.password}
                            handleChange={this.handleFieldChange}
                            handleSubmit={this.login}
                        />
                    </Togglable>
                </div>
            )
        }
  
        return (
        <div className="container">
            <h1>Software anecdotes</h1>
            <Router>
                <div>
                    {(this.props.message &&
                    <Alert color="success">
                        {this.props.message}
                    </Alert>
                    )}
                    <Route exact path="/" render={() => <BlogList />} />
                    <Route exact path="/users" render={() => <Users />} />
                    <Route exact path="/users/:id" render={({match}) => <User userId={match.params.id}/>} />
                </div>
            </Router>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message,
        user: state.loggedUser,
        blogs: state.blogs
    }
  }

const connectedApp = connect(
    mapStateToProps,
    {
        notify,
        blogInitialization,
        setUser,
        logout,
        userInitialization
    }
)(App)

export default connectedApp