import express from 'express';

import { random, authentication } from '../helpers/helpers';
import { getUserByEmail } from '../db/users';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            // end() is required so we wont receive 
            // a mulitple headers error
            return res.status(400).send({ message: 'Please fill out all required fields.'})
        }

        // checks if user exists if not return error
        const user = await getUserByEmail(email).select('+authentication.password +authentication.salt')
        if (!user) {
            return res.status(400).send({ message: 'User already exists.'});
        }

        // authenticate user w/o knowing they're password
        // by using hash comparison
        const expectedHash = authentication(user.authentication.salt, password)

        if (user.authentication.password !== expectedHash) {
            return res.status(403).send({ message: 'Invalid credentials.'})
        }

        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString())

        await user.save()
        res.cookie('AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' })

        return res.status(200).json(user).send({ message: 'Logged In Succesfully.'})
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}