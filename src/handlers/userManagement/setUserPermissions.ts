import { RequestHandler } from 'express';
import { userDatabase } from '../..';
import { validateSiteToken } from '../../helpers/authHelpers';
import Permissions from '../../types/Permissions';

const setUserPermissions: RequestHandler = (req, res) => {
    const { name } = req.params;

    if (name === undefined || name === '') return res.sendStatus(400);

    const authHeader = req.get('Authorization');
    if (authHeader === undefined) return res.sendStatus(401);

    const requester = validateSiteToken(authHeader);
    if (requester === null) return res.sendStatus(400);

    if (!(requester.permissions & Permissions.AssignPermissions)) {
        return res.sendStatus(403);
    }

    const targetUser = userDatabase.get(name.toLowerCase());

    if (targetUser === null) return res.sendStatus(404);

    const isModifyingSelf = requester.name === targetUser.name;

    if (!isModifyingSelf && targetUser.permissions & Permissions.AssignPermissions) {
        return res
            .status(403)
            .send(`${targetUser.name} has the \`AssignPermissions\` permission and so cannot be externally changed.`);
    }

    const { newPermissions } = req.body;

    if (typeof newPermissions !== 'number') return res.sendStatus(400);

    if (newPermissions < Permissions.None) return res.sendStatus(400);

    if (isModifyingSelf) {
        // modfying self = must keep `AssignPermissions` (to prevent accidentally getting locked out)
        if (!(newPermissions & Permissions.AssignPermissions)) {
            return res.status(400).send('Cannot remove `AssignPermissions` permission from yourself, silly.');
        }
    } else {
        // modifying other = can't give `AssignPermissions`
        if (newPermissions & Permissions.AssignPermissions) {
            return res.status(400).send('Cannot give other users the `AssignPermissions` permission.');
        }
    }

    targetUser.permissions = newPermissions;
    userDatabase.set(targetUser);

    return res.sendStatus(200);
};

export default setUserPermissions;
