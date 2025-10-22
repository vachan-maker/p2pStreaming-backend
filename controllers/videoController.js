const uploadVideo = (req,res) => {
    if(!req.file) {
        return res.status(400).send("No Video Uploaded");
    }
    res.send("Video Uploaded Successfully");

}

export {uploadVideo}