import { seedFile } from "../utils/torrent.js";
import Video from "../models/videoModel.js";
import path from "path";

const uploadVideo = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No video file uploaded"
            });
        }

        // Get videoId from multer middleware (set in multerConfig.js)
        const videoId = req.videoId;

        // Seed the file to create magnet URI
        const { magnetURI, infoHash } = await seedFile(req.file.path);

        // Create video document in database
        const video = new Video({
            videoId,
            filename: req.file.filename,
            originalFilename: req.file.originalname,
            filePath: req.file.path,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            magnetURI
        });

        await video.save();

        // Return success response with video details
        res.status(201).json({
            success: true,
            message: "Video uploaded successfully",
            data: {
                videoId,
                filename: req.file.filename,
                originalFilename: req.file.originalname,
                fileSize: req.file.size,
                mimeType: req.file.mimetype,
                filePath: req.file.path,
                magnetURI,
                infoHash,
                uploadedAt: video.uploadedAt
            }
        });

    } catch (error) {
        console.error("Error uploading video:", error);

        // Handle specific error types
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: "Validation error",
                details: error.message
            });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                error: "Video with this ID already exists"
            });
        }

        // Generic error response
        res.status(500).json({
            success: false,
            error: "Failed to upload video",
            details: error.message
        });
    }
};

export { uploadVideo };