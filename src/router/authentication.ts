import express from 'express';
import { register } from '../controllers/register';

export default (router: express.Router) => {
    router.post('/auth/register', register)
}

// sets up a route for registering new users, when the route is accessed with a POST request, it will call a function that will handle the registration process.