import express from 'express';
import authentication from './authentication';
import users from './users';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router)
    return router
}

// sets up a router object that can be used to handle incoming requests for a specific part of the application, 
// and exports it as a module to be used in other parts of the codebase.