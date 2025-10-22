import { seedFile } from "../utils/torrent.js";
const uploadVideo = async (req,res) => {
    if(!req.file) {
        return res.status(400).send("No Video Uploaded");
    }
    const { magnetURI, infoHash } = await seedFile(req.file.path);
    res.json({magnetURI,infoHash});

}

export { uploadVideo }