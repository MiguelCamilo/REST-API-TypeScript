import express from 'express';
import { register } from '../controllers/register';
import { login } from '../controllers/login';

export default (router: express.Router) => {
    router.post('/auth/register', register)
    router.post('/auth/login', login)
}

// sets up a route for registering new users, when the route is accessed with a POST request, 
// it will call a function that will handle the registration process.