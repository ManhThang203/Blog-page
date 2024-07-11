import mongoose from "mongoose";
const PotsSchema = new mongoose.Schema({
    title: String,
    decription: String,
},{timestamps: true})
const Post = mongoose.models.Post || mongoose.model("Post",PotsSchema)
export default Post