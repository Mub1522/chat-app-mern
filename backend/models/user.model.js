import mongoose from "mongoose";
import { GENDERS } from "../constants/genders.js";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: GENDERS,
    },
    avatar: {
        type: String,
        default: "",
    },
});

const User = mongoose.model("User", userSchema);

export default User;