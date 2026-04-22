//! Config express (middlewares, routes, etc.)

import express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import router from './routes/router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

// Middlewares
app.use(express.json());

// Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blogging API',
            version: '1.0.0',
            description: 'Documentation de l\'API de Blogging'
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Serveur local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/modules/**/*.routes.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1', router);

// 404 handler
app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('[ERROR]', err);
    const status = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
    const isClientError = status >= 400 && status < 500;
    res.status(status).json({
        message: isClientError ? err.message : ReasonPhrases.INTERNAL_SERVER_ERROR,
        ...(isClientError && err.errors && { errors: err.errors }),
    });
});

export default app;
