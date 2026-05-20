import express from "express"
import Project from "../../models/project.model.js"

const router = express.Router()
router.get("/", async (req, res) =>{
    const project = await Project.find()
    res.status(200).send(project)

})
export default router;