import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['paragraph', 'heading', 'image'],
    required: true,
  },
  text: {
    type: String,
  },
  src: {
    type: String,
  },
})

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: { type: String, unique: true },
    image: {
      type: String,
      required: true,
    },
    content: [contentSchema],
  },
  { timestamps: true },
)

export default mongoose.model('Post', postSchema)
