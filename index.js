import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import vidRouter from './router/videoManagementRouter.js';
import connectDB from './config/dbConnection.js';
dotenv.config()
const port = process.env.PORT || 3000;

connectDB(); //establishes connection to mongoDB
const app = express();

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/videos', vidRouter);

// Error handling middleware for multer errors
app.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		if (err.code === 'LIMIT_FILE_SIZE') {
			return res.status(400).json({
				success: false,
				error: 'File too large',
				details: 'Maximum file size is 500MB'
			});
		}
		return res.status(400).json({
			success: false,
			error: 'Upload error',
			details: err.message
		});
	}

	if (err) {
		return res.status(400).json({
			success: false,
			error: err.message
		});
	}

	next();
});

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});