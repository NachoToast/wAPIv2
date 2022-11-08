import { RequestHandler } from 'express';
import { userDatabase } from '../..';
import { validateSiteToken } from '../../helpers/authHelpers';
import Permissions from '../../types/Permissions';
import User from '../../types/User';

const getUserByName: RequestHandler = (req, res) => {
    const { name } = req.params;

    if (name === undefined || name === '') return res.sendStatus(400);

    let requesterPermissionLevel = Permissions.None;
    let foundUser: User | null = null;

    const authHeader = req.get('Authorization');
    if (authHeader !== undefined) {
        const requester = validateSiteToken(authHeader);
        if (requester !== null) {
            if (requester.name.toLowerCase() === name.toLowerCase()) {
                // user is requesting their own profile, we show the same information an admin would see
                requesterPermissionLevel = Permissions.AssignPermissions;
                foundUser = requester;
            } else {
                requesterPermissionLevel = requester.permissions;
            }
        }
    }

    foundUser ??= userDatabase.get(name.toLowerCase());

    if (foundUser === null) return res.sendStatus(404);

    const finalUser: Partial<User> = foundUser;

    if (!(requesterPermissionLevel & Permissions.AssignPermissions)) {
        // must have `AssignPermissions` permission to see IP
        delete finalUser.latestIp;
    }
    delete finalUser.password;

    return res.status(200).json(finalUser);
};

export default getUserByName;
