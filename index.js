import express, { Router } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import resumeRoute from './routes/Resume.js'
import userRoute from './routes/User.js';
import connectDb from './db.js';
import featureRoute from './routes/Feature.js';

config();

const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT;

await connectDb()

app.use('/resume', resumeRoute)
app.use('/user', userRoute)
app.use('/feature', featureRoute)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});