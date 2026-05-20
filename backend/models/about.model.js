import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  about: {
    type: String,
  },
  experience: {
    type: String,
  },
  skills: {
    type: String,
  },
  education: {
    type: String,
  },
});

export default mongoose.model("About", aboutSchema, "about");