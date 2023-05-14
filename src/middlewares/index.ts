import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/dbSchema';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const { id } = req.params;

		const currentUserId = get(req, 'identity._id') as string;

		if (!currentUserId) {
			return res.sendStatus(403);
		}

		if (currentUserId.toString() !== id) {
			return res.sendStatus(403);
		} 

		// whats the reason we do not use return next() here?

		// reason we dont use return next() here is 
		// because we want to pass control to the next middleware function
		next()
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

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
