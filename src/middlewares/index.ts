import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/dbSchema';

export const isAuthenticated = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const sessionToken = req.cookies['AUTH'];

		if (!sessionToken) {
			return res.sendStatus(403)
		}

		const existingUser = await getUserBySessionToken(sessionToken);

		if (!existingUser) {
			return res.status(403).send({ message: 'Invalid session token' });
		}

		merge(req, { identity: existingUser });
        
        // allows control to be passed to the next middleware function
		return next();
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};
