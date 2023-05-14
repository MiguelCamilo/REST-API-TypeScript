import express from 'express';

import { getUserByEmail, createUser } from '../db/dbSchema';
import { random, authentication } from '../helpers/helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        // extracting data from body
        // samething that was set up in the schema
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).send({ message: 'Please fill out all required fields.'});
        }
        // checks if there is a user with the same email
        const existingUser = await getUserByEmail(email);
        // returns error if true
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists.' });
        }
        
        const salt = random() // creates random string
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password) // passing back the two params we set up in the helper function
            }
        })
        // returns the new user in a json format
        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
