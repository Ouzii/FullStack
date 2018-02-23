const notificationReducer = (store = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.message
        default:
            return store
    }
}

export const setNotification = (message, seconds) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            message
        })
        await setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                message: ''
            })
        }, seconds * 1000)

    }
}

export default notificationReducer