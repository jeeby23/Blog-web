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

    const { title, description, content } = req.body

    // ✅ validation

    if (!title || !description) {

      return res.status(400).json({ message: 'Title and description are required' })

    }

    let imageUrl = ''

    // ✅ Cloudinary upload (SAFE)

   if (req.file) {
  try {
    console.log("Uploading file to Cloudinary...")

    const result = await uploadToCloudinary(req.file.buffer)

    console.log("UPLOAD SUCCESS:", result)

    imageUrl = result.secure_url
  } catch (err) {
    console.error("CLOUDINARY FULL ERROR:", err)
    return res.status(500).json({
      message: 'Image upload failed',
      error: err.message,
    })
  }
}

    // ✅ slug generation

    let slug = slugify(title)

    const existing = await Post.findOne({ slug })

    if (existing) {

      slug = `${slug}-${Date.now()}`

    }

    // ✅ create post

    const newPost = new Post({

      title,

      description,

      content: content || '',

      image: imageUrl,

      slug,

    })

    const savedPost = await newPost.save()

    return res.status(201).json(savedPost)

  } catch (error) {

    console.error('CREATE POST ERROR:', error)

    return res.status(500).json({

      message: error.message,

    })

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
  try {
    const { slug } = req.params

    const post = await Post.findOne({ slug })
    if (!post) {
      return res.status(404).json({ message: 'Post Not Found' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
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
      return res.status(404).json({ message: 'Post Not Found' })
    }
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
