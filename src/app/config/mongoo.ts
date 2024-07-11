import mongoose from "mongoose"
const ConnectDB = async () =>{
    try {
        mongoose.connect(`${process.env.MONG_DB}`)
        console.log("Connect Succes Data")
    } catch (error) {
         console.log("Connect Failed")
    }
}
export default ConnectDB