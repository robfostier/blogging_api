//! Server entry point

import app from './app.js';
import appState from './config/appState.js';

try {
    await appState.init();
    app.listen(appState.config.PORT, () => {
        console.log(`Server is running on port ${appState.config.PORT}`);
    });
} catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
}
