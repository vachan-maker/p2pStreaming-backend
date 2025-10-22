import express from  'express';
import dotenv from 'dotenv';
import vidRouter from './router/videoManagementRouter.js';
dotenv.config()
const port = process.env.PORT || 3000;

const app = express();

app.use('/api/videos',vidRouter);
app.listen(port,()=>`Listening on ${port}`);