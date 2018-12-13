import React from 'react'
import Togglable from './Togglable'
import { connect } from 'react-redux'

class Blog extends React.Component {
    handleClick = () => {
        this.blogInfo.toggleVisibility()
    }

    render() {
        const showWhenVisible = { display: this.props.showDelete ? '' : 'none' }
        console.log(this.props)
        const togglable = () => (
                <Togglable ref={component => this.blogInfo = component}>
                    <div className="blogInfo">
                        <p>
                            <a href={this.props.blog.url}>{this.props.blog.url}</a>
                        </p>
                        <p>{this.props.blog.likes} likes <button onClick={this.props.addLike}>like</button></p>
                        <p>added by {!this.props.blog.user ? 'anonymous' : this.props.blog.user.name}</p>
                        <button style={showWhenVisible} onClick={this.props.removeBlog}>delete blog</button>
                    </div>
                </Togglable>
        )
        
        return(
            <div>
                <div className='blog' onClick={this.handleClick}>
                    <p>
                        <strong>{this.props.blog.title}</strong> {this.props.blog.author}
                    </p>                                    
                </div>  
                {togglable()}
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        blog: state.blogs.filter(blog => blog.id === ownProps['id'])[0]
    }
}
  
export default connect(
    mapStateToProps,
    {
        
    }
)(Blog)