import express from 'express';
import { getCharactersController } from './controller';

const rickMortyRouter = express.Router();

rickMortyRouter.get('/characters', getCharactersController);

export { rickMortyRouter };
