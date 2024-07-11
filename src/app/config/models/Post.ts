import mongoose from "mongoose";
const PotsSchema = new mongoose.Schema({
    title: String,
    decription: String,
},{timestamps: true})
export default mongoose.model("Post",PotsSchema)