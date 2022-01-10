
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification.length>1) {
  return (
    <div style={style}>
      {notification}
    </div>
  )
  }
  return (
    <div>
      
    </div>
  )
}

 const mapStateToProps = (state) => {
  return {
    notification : state.popUps
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications