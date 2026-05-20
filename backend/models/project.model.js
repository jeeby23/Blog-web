import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  image: {
    type: String,
  },
})

export default mongoose.model('Project', projectSchema, 'project')
