import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rickMortyRouter } from './services/rick-morty-api/routes';
import { UserModel } from './services/users/user.model';
import { createUserRoutes } from './services/users/user.routes';
import { errorMiddleware } from './middlewares/error.handler';

const createApp = () => {
  const port = process.env.PORT || 4000;

  const app = express();

  // Middlawares
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));

  // Routes
  app.use(rickMortyRouter);
  app.use('/users', createUserRoutes({ userModel: UserModel }));

  // Handle Error Middleware
  app.use(errorMiddleware);

  // Start server
  app.listen(port, () => {
    console.log(`🚀[server] Listening on port: ${port}`);
  });
};

export { createApp };
