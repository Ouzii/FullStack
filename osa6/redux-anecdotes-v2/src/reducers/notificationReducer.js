const notificationReducer = (store = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.message
        default:
            return store
    }
}

export const setNotification = (message) => {
    return {
        type: 'SET_NOTIFICATION',
        message
    }
}

export default notificationReducer