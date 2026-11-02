import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false
    }
}, {timestamps: true});

const adminModel = await mongoose.model("admin", adminSchema);

export default adminModel