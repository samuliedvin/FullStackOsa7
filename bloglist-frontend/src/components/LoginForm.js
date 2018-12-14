import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { setUser } from '../reducers/loggedUserReducer'
import { FormControl, FormGroup, Button, ControlLabel } from 'react-bootstrap'


class LoginForm extends React.Component {
    
    login = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username: event.target.username.value,
                password: event.target.password.value
            })
            this.props.setUser(user)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
        } catch(exception) {
            this.props.notify('wrong username or password', 4)
        }
    }


    render () {
        return (
            <div>
                <h2>Kirjaudu</h2>
                <form onSubmit={this.login}>
                    <FormGroup>
                        <ControlLabel>Käyttäjätunnus</ControlLabel>
                        <FormControl type="text" name="username" />
                        <ControlLabel>Salasana</ControlLabel>
                        <FormControl type="password" name="password" />
                        <Button type="submit">kirjaudu</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}


export default connect(
    null,
    {
        notify,
        setUser
    }
)(LoginForm)
