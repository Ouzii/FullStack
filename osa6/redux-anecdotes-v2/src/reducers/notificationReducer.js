

const notificationReducer = (store = '', action) => {
    switch (action.type) {
    case 'NOTIFICATION_VOTE':
      return `you voted '${action.message}'`
    case 'NOTIFICATION_ADDED':
        return `you added '${action.message}'`
    case 'RESET':
        return `${action.message}`
    default:
      return store
    }
  }

  export const setNotificationVote = (message) => {
      return {
          type: 'NOTIFICATION_VOTE',
          message: message
      }
  }
  export const setNotificationAdded = (message) => {
      return {
          type: 'NOTIFICATION_ADDED',
          message: message
      }
  }
  export const resetNotification= (message) => {
      return {
        type: 'RESET',
        message: message
      }
  }
  
  export default notificationReducer