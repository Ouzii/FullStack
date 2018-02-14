import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }
  
  return (
    error === false ? 
    <div className="notification">
      {message}
    </div>
    :
    <div className="error">
      {message}
    </div>
  )
}

export default Notification