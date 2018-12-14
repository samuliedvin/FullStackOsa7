import React from 'react'
import { Button } from 'react-bootstrap'

class Togglable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }
    
  
    toggleVisibility = () => {
        this.setState({visible: !this.state.visible})
    }
  
    render() {
        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }
        const showButtons = { display: !this.props.buttonLabel ? 'none' : '' }

    
        return (
            <div>
            <div style={hideWhenVisible}>
                <Button style={showButtons} onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {this.props.children}
                <Button style={showButtons} onClick={this.toggleVisibility}>cancel</Button>
            </div>
            </div>
        )
    }
}

export default Togglable