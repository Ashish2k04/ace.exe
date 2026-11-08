import mongoose from "mongoose";

interface IProfile {
    name: string;
    profileImage: string;
    profileImageFileId?: string;
    about: string;
    resume?: string;
    resumeFileId? : string;
}

const profileSchema = new mongoose.Schema<IProfile>({
    name: {
        type: String,
        trim: true,
        default: "Default User"
    },
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/tsiwfr1zi/ghost-default.jpg"
    },
    profileImageFileId: {
        type: String,
        trim: true
    },
    about: {
        type: String,
        trim: true,
        default: "I'm a Full Stack Developer passionate about building scalable web applications and exploring emerging technologies."
    },
    resume: {
        type: String,
    },
    resumeFileId: {
      type: String,
      trim: true
   }
});

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;