import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorMiddleware } from './middlewares/error.handler';
import { publicRoutes } from './routes';
import { rickMortyRouter } from './services/rick-morty-api/routes';
import { mongooseConnection } from './db/mongo-connection';
import { verifyAuth } from './middlewares/auth';
import { isProduction } from './utils/isproduction';

const createApp = () => {
  const port = process.env.PORT || 4000;

  const app = express();

  // Middlawares
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan(isProduction ? 'combined' : 'dev'));

  // Routes
  app.use(rickMortyRouter);
  app.use('/api', verifyAuth, publicRoutes());

  // Handle Error Middleware
  app.use(errorMiddleware);

  // Start server
  app.listen(port, async () => {
    console.log(`🚀[server] Listening on port: ${port}`);
    await mongooseConnection();
  });
};

export { createApp };
