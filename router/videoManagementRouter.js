import { Router } from "express";
import { upload } from "../config/multerConfig.js";
import { uploadVideo } from "../controllers/videoController.js";
const vidRouter = Router();

vidRouter.post('/upload',upload.single('video'),uploadVideo);


export default vidRouter;