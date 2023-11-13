import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rickMortyRouter } from './services/rick-morty-api/routes';

const port = process.env.PORT || 4000;

const app = express();

// Middlawares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use(rickMortyRouter);

// Server running
app.listen(port, () => {
  console.log(`🚀[server] Listening on port: ${port}`);
});
