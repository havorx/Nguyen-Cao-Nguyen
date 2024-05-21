import 'reflect-metadata';
import path from 'path';
import express from 'express';
import pino from 'pino-http';
import { container } from 'tsyringe';
import { HousesRoutes } from './routes/houses.route';
import {
  migrateSchema,
  validateConnection,
} from './services/databases/sequelizeClient';

const app = express();

const logger = pino();

app.use((req, res, next) => {
  logger(req, res);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const housesRouter = container.resolve(HousesRoutes).housesRouter;

app.use('/houses', housesRouter);

validateConnection();
migrateSchema();

export default app;
