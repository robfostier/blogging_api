//! Application state manager
//! Centralizes initialization logic (database connection, etc.).
//! Call appState.init() once at startup before starting the HTTP server.

import mongoose from 'mongoose';
import env from './env.js';

const appState = {
    config: env,

    async init() {
        await mongoose.connect(env.MONGO_URI);
        console.log('Connected to MongoDB');
    },
};

export default appState;
