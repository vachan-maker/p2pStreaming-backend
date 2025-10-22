import express from  'express';
import dotenv from 'dotenv';

dotenv.config()
const port = process.env.PORT || 3000;

const app = express();


app.listen(PORT,()=>`Listening on ${port}`);