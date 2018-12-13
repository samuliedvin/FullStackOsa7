import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

class User extends React.Component {

    render() {
        return(
        <div>
            <h2>Added blogs - {this.props.user.name}</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Author
                        </th>
                        <th>
                            Likes
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.user.blogs.map(blog =>
                    <tr>
                        <td>
                            {blog.title}
                        </td>
                        <td>
                            {blog.author}
                        </td>
                        <td>
                            {blog.likes}
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    return {
        user: state.users.find(user => user.id === ownProps.userId)
    }
}

export default connect(mapStateToProps)(User)