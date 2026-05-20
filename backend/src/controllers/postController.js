import Post from '../../models/post.model.js'

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body
    const image = req.file?.path

    const parsedContent = JSON.parse(req.body.content || '[]')
    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }
    const newPost = new Post({
      title,
      description,
      content: parsedContent,
      image,
    })

    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
