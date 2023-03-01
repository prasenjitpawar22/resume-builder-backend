import express, { Router } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import resumeRoute from './routes/Resume'
import connectDb from './db';
import featureRoute from './routes/Feature';
import userRoute from './routes/User';



const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT

connectDb()

app.use('/resume', resumeRoute)
app.use('/user', userRoute)
app.use('/feature', featureRoute)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});