import express from 'express';
import env from 'dotenv';
import { initRoutes } from './routers/index.js';
import cors from 'cors';

const app = express();

env.config();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(
   cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
   }),
);

initRoutes(app);

app.listen(port, () => {
   console.log('Backend is running on ', port);
});
