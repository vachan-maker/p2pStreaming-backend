import { Router } from "express";

const vidRouter = Router();

vidRouter.post('/upload',(req,res)=>{
    res.send("Video has been uploaded!")
})


export default vidRouter;