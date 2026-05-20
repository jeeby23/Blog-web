import express from "express"
import About from "../../models/about.model.js"


const router = express.Router()

router.get("/", async (req, res) =>{
    const about = await About.find()
    res.status(200).send(about)
})
export default router;