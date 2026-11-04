import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/tsiwfr1zi/ghost-default.jpg"
    },
    about: {
        type: String,
        trim: true,
        default: "I'm a Full Stack Developer passionate about building scalable web applications and exploring emerging technologies."
    },
    resume: {
        type: String,
    }
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;