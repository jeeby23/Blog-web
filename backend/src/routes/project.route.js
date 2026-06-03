import express from "express"
import Project from "../../models/project.model.js"

const router = express.Router()
/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Get Project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - desc
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

router.get("/", async (req, res) =>{
    const project = await Project.find()
    res.status(200).send(project)

})
export default router;