import mongoose from "mongoose";

// creating a schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true}
})