//! Config express (middlewares, routes, etc.)

import express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import router from './routes/router.js';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/v1', router);

// 404 handler
app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
});

export default app;
