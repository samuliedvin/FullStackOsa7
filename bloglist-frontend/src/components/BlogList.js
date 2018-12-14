import { connect } from 'react-redux'
import React from 'react'
import BlogForm from './BlogForm'
import { logout } from '../reducers/loggedUserReducer'
import { Link } from 'react-router-dom'
import { Table, PageHeader } from 'react-bootstrap'



class BlogList extends React.Component {

    render() {
        return(
            <div>
                <PageHeader>Blogs</PageHeader> 
                <BlogForm /> 
                <Table striped>
                <thead>
                    <tr>
                        <th>
                            Blog title
                        </th>
                        <th>
                            Author
                        </th>
                    </tr>
                </thead>
                <tbody>
                {this.props.blogs.sort((a, b) => (b.likes - a.likes)).map(blog => // sort blogs in descending order by likes
                    <tr key={blog.id}>
                        <td>
                            <Link to={`blogs/${blog.id}`}>{blog.title}</Link> 
                        </td>
                        <td>
                            {blog.author}
                        </td>   
                    </tr>  
                )}
                </tbody>
            </Table>
                
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

export default connect(mapStateToProps, { logout })(BlogList)