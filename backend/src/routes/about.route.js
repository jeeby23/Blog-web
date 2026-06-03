import express from "express"
import About from "../../models/about.model.js"


const router = express.Router()

/**
 * @swagger
 * /api/about:
 *   get:
 *     summary: Get About Details
 *     tags: [About]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - about
 *               - experience
 *               - skills
 *               - education
 *             properties:
 *               about:
 *                 type: string
 *               experience:
 *                 type: string
 *               skills:
 *                 type: string
 *               education:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */


router.get("/", async (req, res) =>{
    const about = await About.find()
    res.status(200).send(about)
})
export default router;