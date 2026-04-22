//! Main export for users module
//! Re-exports the router and the model so the global router only needs
//! to import from this single entry point.

import routes from './users.routes.js';

export default [
    { path: '/users', routes },
];