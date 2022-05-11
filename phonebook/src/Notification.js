import React from 'react'

const Notification = ({ notification, error }) => {
  if (notification === null) {
    return
  }

  return <div className={error ? 'error' : 'success'}>{notification}</div>
}

export default Notification
