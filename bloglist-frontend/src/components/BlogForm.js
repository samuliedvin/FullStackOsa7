import React from 'react'
import { FormControl, FormGroup, Button, ControlLabel, Modal } from 'react-bootstrap'
import { addBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
    }
    
    addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: event.target.newTitle.value,
            author: event.target.newAuthor.value,
            url: event.target.newUrl.value
        }
        this.props.addBlog(newBlog)
        this.setState({ showModal: false })
        this.props.notify(`A new blog ${newBlog.title} added!`, 5)
    }
    
    render () {
        return (
            <div>
                <Button onClick={() => {this.setState({ showModal: true })}} >Create a blog</Button>
                <Modal show={this.state.showModal} onHide={() => {this.setState({ showModal: false })}}>
                    <form onSubmit={this.addBlog}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Create a new blog!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <FormGroup>
                                <div>
                                    <ControlLabel>Title</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="newTitle"
                                    />
                                </div>
                                <div>
                                <ControlLabel>Author</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="newAuthor"
                                    />
                                </div>
                                <div>
                                <ControlLabel>Url</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="newUrl"
                                    />
                                </div>
                            </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Save</Button>
                        <Button onClick={() => {this.setState({ showModal: false })}}>Cancel</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default connect(null, { addBlog, notify })(BlogForm)
