//! Business logic for users routes
//! All database queries go here. Controllers call these functions
//! and never interact with the model directly.

import User from './users.model.js';

export async function login({ email, password }) {
    // verify password (bcrypt) and generate JWT token
    return null;
}
