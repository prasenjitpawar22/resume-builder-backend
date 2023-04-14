import express, { Router } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import formRoutes from './routes/Forms/formsRoute';
import path from 'path';

config()

const app = express();
app.use(express.json())
app.use(cors())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

const port = process.env.PORT

app.use('/build', formRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});