//! JWT authentication middleware
//! Returns 401 if the token is missing or invalid.

export const requireAuth = (req, res, next) => {
    // ToDo
    console.log("Authentification, à faire");
    next(); 
};