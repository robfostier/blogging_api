//! Main export for likes module
//! Re-exports the router so the global router only needs
//! to import from this single entry point.

import routes from './like.routes.js';

export default [
    { path: '/posts/:id/likes', routes },
];
