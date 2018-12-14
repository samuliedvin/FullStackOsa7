import blogService from '../services/blogs'

const initialState = []

const blogReducer = (store = initialState, action) => {
    switch(action.type) {
    case 'LIKE':
        const old = store.filter(a => a.id !==action.id)
        const liked = store.find(a => a.id === action.id)
        return [...old, { ...liked, likes: liked.likes+1 } ]
    case 'CREATE':
        return [...store, action.data]
    case 'REMOVE':
        return store.filter(a => a.id !== action.id)    
    case 'INIT_BLOGS':
        return action.data
    case 'ADD_COMMENT':
        const oldC = store.filter(a => a.id !==action.id)
        const commented = store.find(a => a.id === action.id)
        return [...oldC, { ...commented, comments: commented.comments.concat(action.comment) } ]
    default:
        return store
    }
}

export const blogInitialization = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'CREATE',
            data: newBlog
        })
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        await blogService.update(blog.id, {
            ...blog,
            likes: blog.likes + 1
        })
        dispatch({
            type: 'LIKE',
            id: blog.id
        })
    }
}

export const removeBlog = (blog) => {
    return async (dispatch) => {
        await blogService.remove(blog.id)
        dispatch({
            type: 'REMOVE',
            id: blog.id
        })
    }
}

export const commentBlog = (blog, comment) => {
    return async (dispatch) => {
        await blogService.comment(blog.id, comment)
        dispatch({
            type: 'ADD_COMMENT',
            id: blog.id,
            comment: comment
        })
    }
}

export default blogReducer