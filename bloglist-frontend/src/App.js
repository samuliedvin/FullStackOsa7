import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import User from './components/User'
import { notify } from './reducers/notificationReducer'
import { blogInitialization } from './reducers/blogReducer'
import { connect } from 'react-redux'
import { setUser, logout } from './reducers/loggedUserReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, Navbar, NavItem, Nav } from 'react-bootstrap'
import BlogList from './components/BlogList'
import Users from './components/Users'
import { userInitialization } from './reducers/usersReducer';
 
class App extends React.Component {

    async componentDidMount() {
        this.props.userInitialization()
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        await this.props.blogInitialization()
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.props.setUser(user)
            blogService.setToken(user.token)
        }
    }

    render() {
        if (this.props.user === null) {
            return (
                <div className="container">
                    <Notification />
                    <LoginForm />
                </div>
            )
        }
        return (
        <div className="container">
            <Router>
                <div>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#home">Bloglist</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav>
                            <NavItem>
                                <Link to="/">Blogs</Link> &nbsp;
                            </NavItem>
                            <NavItem>
                                <Link to="/users">Users</Link> &nbsp;
                            </NavItem>
                        </Nav>
                        <Navbar.Text>
                            <Link to={`/users/${this.props.user.id}`}>{this.props.user.name}</Link> logged in
                        </Navbar.Text>
                        <Navbar.Form>
                            <Button onClick={this.props.logout}>logout</Button>
                        </Navbar.Form>
                    </Navbar>
                    <Notification />
                    <Route exact path="/" render={() => <BlogList />} />
                    <Route exact path="/blogs/:id" render={({match, history}) => <Blog blogId={match.params.id} history={history} />} />
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