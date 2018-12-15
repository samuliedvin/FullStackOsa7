import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Users extends React.Component {

    render() {
        return(
            <Table striped>
                <thead>
                    <tr>
                        <th>
                            User
                        </th>
                        <th>
                            Username
                        </th>
                        <th>
                            Blogs Added
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.users.map(user =>
                    <tr>
                        <td>
                            <Link to={`${process.env.PUBLIC_URL}/users/${user.id}`}> {user.name}</Link>
                        </td>
                        <td>
                            {user.username}
                        </td>
                        <td>
                            {user.blogs.length}
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Users)