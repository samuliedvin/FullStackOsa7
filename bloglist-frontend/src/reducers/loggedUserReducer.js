const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_USER':   
            return action.user
        case 'LOG_OUT':
            return null
        default:
            return state
    }
}

export const setUser = (user) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_USER',
            user
        })
    }
}

export const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    return (dispatch) => {
        dispatch({
            type: 'LOG_OUT'
        })
    }
}

export default userReducer
