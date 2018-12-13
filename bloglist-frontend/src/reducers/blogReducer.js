import blogService from '../services/blogs'

const initialState = []

const blogReducer = (store = initialState, action) => {
    switch(action.type) {
    case 'VOTE':
        const old = store.filter(a => a.id !==action.id)
        const voted = store.find(a => a.id === action.id)
        return [...old, { ...voted, votes: voted.votes+1 } ]
    case 'CREATE':
        return [...store, action.data]
    case 'REMOVE':
        return store.filter(a => a.id !== action.id)    
    case 'INIT_BLOGS':
        return action.data
    }
    return store
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

export const addBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'CREATE',
            data: newBlog
        })
    }
}

export const voteBlog = (blog) => {
    return async (dispatch) => {
        await blogService.update(blog.id, {
            ...blog,
            likes: blog.likes + 1
        })
        dispatch({
            type: 'VOTE',
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

export default blogReducer