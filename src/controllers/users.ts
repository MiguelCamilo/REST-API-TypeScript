import express from 'express';
import { get } from 'lodash';

import { getUsers } from '../db/dbSchema';
import { deleteUserById } from '../db/dbSchema';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);
        
        return res.send({ message: 'User deleted', user: deletedUser })
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}