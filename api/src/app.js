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

// Global error handler
app.use((err, req, res, next) => {
    const status = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
    const isClientError = status >= 400 && status < 500;
    res.status(status).json({
        message: isClientError ? err.message : ReasonPhrases.INTERNAL_SERVER_ERROR,
        ...(isClientError && err.errors && { errors: err.errors }),
    });
});

export default app;
