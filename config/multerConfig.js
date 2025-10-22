import multer from 'multer';
import path from 'path';
import fs from 'fs';
//we are creating the disk storage engine
//diskStorage is a function that takes an object with two functions as args. One is destination and the other is filename
const storage = multer.diskStorage({
    destintation:(req,file,cb) => {
        cb(null,'uploads/videos'); //callback function to tell Multer where to store the file
    },
    filename: (req,file,cb) => {
        const uniqueName = Date.now() + Math.round(Math.random()*1E9);
        cb(null,uniqueName + path.extname(file.originalname)) //extname is used to keep the original file extension
    }
}
)

//we can limit the file size and also only allow .mp4 files with multer...coming soon!
const upload = multer({storage})

export {upload}