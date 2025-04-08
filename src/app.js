import express from 'express';

import configureHelmet from './config/helmet.config.js';
import limiter from './config/rateLimiter.config.js';
import menuRoutes from './routes/menuz.routes.js';
import healthRoutes from './routes/health.routes.js';
import errorHandler from './middlewares/errorHandler.js';
import configureCors from './config/cors.config.js';

const app = express();

app.use(configureCors());

app.use(configureHelmet());
app.use(limiter);

app.use(express.json());

app.use('/menu', menuRoutes);
app.use('/health', healthRoutes);

app.use(errorHandler);

export default app;
