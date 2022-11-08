import { RequestHandler } from 'express';
import { userDatabase } from '../..';
import { validateSiteToken } from '../../helpers/authHelpers';
import Permissions from '../../types/Permissions';
import User from '../../types/User';

const getCurrentUser: RequestHandler = (req, res) => {
    const authHeader = req.get('Authorization');

    if (authHeader === undefined) return res.sendStatus(401);

    const user = validateSiteToken(authHeader);

    if (user === null) return res.sendStatus(400);

    if (!(user.permissions & Permissions.AssignPermissions)) {
        return res.sendStatus(403);
    }

    const allUsers = userDatabase.getAllValues().map((user) => {
        const partialUser: Partial<User> = user;
        delete partialUser.password;
        return partialUser;
    });

    return res.status(200).json(allUsers);
};

export default getCurrentUser;
