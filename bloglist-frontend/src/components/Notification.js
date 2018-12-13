import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    if (this.props.message === null) {
      return null
    }
    return (
      <div className="error">
        {this.props.message}
      </div>
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