const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user
    }
}


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username : 1, name: 1 })
    response.json(blogs.map(blog => formatBlog(blog)))
})
  
blogsRouter.post('/', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const body = request.body

        if (body.title === undefined && body.url === undefined) {
            return response.status(400).json({ error: 'title AND url missing' })
        } 
        if (body.title === undefined) {
            return response.status(400).json({ error: 'title missing' })
        } 
        if (body.url === undefined) {
            return response.status(400).json({ error: 'url missing' })
        }
 
        let user = await User.findById(decodedToken.id)
        if(!user) {
            const users = await User.find({})
            user = users[0]
        }

        const blog = new Blog ({
            title: body.title,
            author: body.author || 'Anonymous',
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })

        const savedBlog = await blog.save()
        
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        await Blog.populate(savedBlog, 'user')
        response.json(formatBlog(savedBlog))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const userid = decodedToken.id
        const blog = await Blog.findById(request.params.id)
        console.log(blog.user, userid)
        if(!blog.user) {
            await blog.remove()
            return response.status(204).end()  
        } 
        if(blog.user.toString() !== userid.toString()) {
            return response.status(401).json({ error: 'invalid user' })
        }
        await blog.remove()
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

blogsRouter.put('/:id', (request, response) => {
    const body = request.body
  
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
  
    Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            Blog.populate(updatedBlog, 'user')
                .then(updatedBlog => {
                    response.json(formatBlog(updatedBlog))
                })
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = blogsRouter