import multer from 'multer';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Ensure the upload directory exists at startup
const uploadPath = path.join(process.cwd(), 'uploads', 'videos'); // get the root directory and join it with uploads and videos
fs.mkdirSync(uploadPath, { recursive: true });

// we are creating the disk storage engine
// diskStorage is a function that takes an object with two functions as args. One is destination and the other is filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // callback function to tell Multer where to store the file
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname)); // extname is used to keep the original file extension
    }
});

// we can limit the file size and also only allow .mp4 files with multer...coming soon!
const upload = multer({ storage });

export { upload };