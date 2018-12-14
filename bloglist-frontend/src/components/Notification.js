import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

class Notification extends React.Component {
  render() {
    return(
    (this.props.message &&
      <Alert color="success">
          {this.props.message}
      </Alert>
    )
    )
  }
}

const mapStateToProps = (state) => {
  return {
      message: state.message,
  }
}

const connectedNotification = connect(
  mapStateToProps
)(Notification)

export default connectedNotification