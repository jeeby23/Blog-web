import express from 'express'
import { upload } from '../../config/multer.js'
import { getAllPosts, getPostById,createPost } from '../controllers/postController.js'
const router = express.Router()

router.get('/', getAllPosts)
router.get('/:id', getPostById)
router.post('/', upload.single("image"), createPost)

export default router
