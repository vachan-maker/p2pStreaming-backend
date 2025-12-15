import mongoose,{ mongo } from "mongoose";

const videoSchema = new mongoose.Schema({
    filename: {
        type:String,
        required:true,
    },
    magnetURI: {
        type:String,
        required:true,
    }
});

export default mongoose.model("Video",videoSchema);