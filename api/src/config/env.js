//! Environment variables loader and validator
//! Loads .env file and exports a validated config object.
//! Throws an error at startup if a required variable is missing.

import 'dotenv/config';

const required = ['JWT_SECRET', 'MONGO_URI'];

for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT) || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
};

export default env;
