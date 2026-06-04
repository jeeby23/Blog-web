import Post from '../../models/post.model.js'
import { slugify } from '../../utils/slugify.js'
import cloudinary from '../../config/cloudinary.js'
import fs from 'fs'

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
    const rawContent = req.body.content || ''
    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }
    let imageUrl = ''

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'blog-images',
      })
      imageUrl = result.secure_url

      fs.unlinkSync(req.file.path)
    }

    let slug = slugify(title)
    const existingPost = await Post.findOne({ slug })
    if (existingPost) {
      slug = `${slug}-${Date.now()}`
    }

    const newPost = new Post({
      title,
      description,
      content: rawContent,
      image: imageUrl,
      slug,
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

export const getPostBySlug = async (req, res) => {
  const { slug } = req.params

  const post = await Post.findOne({ slug })
  if (!post) {
    return res.status(400).json({ message: 'Post Not Found' })
  }
  res.json(post)
}

export const getRecentPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 }).limit(3)
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const updatePost = await Post.findByIdAndUpdate(id, req.body, { new: true })
    if (!updatePost) {
      return res.status(404).json({ message: 'Post Not Found' })
    }
    res.json(updatePost)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const deletePost = await Post.findByIdAndDelete(id)

    if (!deletePost) {
      return res.status(404).json({ message: errorMessages })
    }
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json(toast.error(error.message))
  }
}
