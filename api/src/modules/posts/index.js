//! Main export for posts module
//! Re-exports the router so the global router only needs
//! to import from this single entry point.

import routes from './posts.routes.js';

export default [
    { path: '/posts', routes },
];