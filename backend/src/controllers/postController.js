import Post from '../../models/post.model.js'
import { slugify } from '../../utils/slugify.js'
import { uploadToCloudinary } from '../../config/cloudinaryUpload.js'
import { htmlToText } from 'html-to-text'


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
    
    let imageUrl = ''

    // 🟢 Check if a file was uploaded via memoryStorage
    if (req.file) {
      try {
        // Pass the file buffer to Cloudinary and await the response profile
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer)
        imageUrl = cloudinaryResult.secure_url // This gives you the cloud https link
      } catch (uploadError) {
        return res.status(500).json({ message: 'Cloudinary upload failed', error: uploadError.message })
      }
    }

    // Generate plainText for clean indexing/previews while leaving content as HTML strings
    const plainText = htmlToText(rawContent, { wordwrap: false })

    let slug = slugify(title)
    const existingPost = await Post.findOne({ slug })
    if (existingPost) {
      slug = `${slug}-${Date.now()}`
    }

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const newPost = new Post({
      title,
      description,
      content: rawContent, // Retains raw HTML layout containing Quill embedded assets
      plainText,          // Stripped plain string 
      image: imageUrl,    // Cloudinary HTTPS url saved to MongoDB
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
