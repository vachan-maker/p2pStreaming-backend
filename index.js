import express from  'express';
import dotenv from 'dotenv';
import vidRouter from './router/videoManagementRouter.js';
import connectDB from './config/dbConnection.js';
dotenv.config()
const port = process.env.PORT || 3000;

connectDB(); //establishes connection to mongoDB
const app = express();

app.use('/api/videos',vidRouter);
app.listen(port, () => {
	console.log(`Listening on ${port}`);
});