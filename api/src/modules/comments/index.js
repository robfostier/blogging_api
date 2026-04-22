//! Main export for comments module
//! Re-exports the routers so the global router only needs
//! to import from this single entry point.

import { router, nestedRouter } from './comment.routes.js';

export default [
    { path: '/comments',           routes: router },
    { path: '/posts/:id/comments', routes: nestedRouter },
];