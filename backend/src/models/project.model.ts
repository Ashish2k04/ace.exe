import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    liveUrl: {
       type: String,
       trim: true
    },
    githubUrl: {
       type: String,
       trim: true
    },
    thumbnail: {
       type: String,
       required: true,
       trim: true
    },
    skills: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Skill",
       required: true
    }]
});

const Project = mongoose.model("Project", projectSchema);

export default Project;