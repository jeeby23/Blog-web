import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['paragraph', 'heading', 'image'],
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
  },
  { _id: false },
)

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Post', postSchema)
