import express, { Router } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

// import featureRoute from './';
import userRoute from "./routes/user/user.routes"
import resumeRoutes from "./routes/resume/resume.routes"
import featureRoutes from "./routes/feature/feature.routes"
import formRoutes from './routes/Forms/formsRoute';

config()

const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT

// app.use('/resume', resumeRoute)
// app.use('/feature', featureRoutes)
// app.use('/user', userRoute)
// app.use('/resume', resumeRoutes)
app.use('/build', formRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});