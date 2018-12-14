import userService from '../services/users'

const usersReducer = (store = [], action) => {
    switch(action.type) {  
        case 'INIT_USERS':
            return action.data
        default:
            return store
    }
}
 
export const userInitialization = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

export default usersReducer