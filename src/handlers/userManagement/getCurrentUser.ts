import { RequestHandler } from 'express';
import { validateSiteToken } from '../../helpers/authHelpers';
import User from '../../types/User';

const getCurrentUser: RequestHandler = (req, res) => {
    const authHeader = req.get('Authorization');

    if (authHeader === undefined) return res.sendStatus(401);

    const user = validateSiteToken(authHeader);

    if (user === null) return res.sendStatus(400);

    const finalUser: Partial<User> = user;

    delete finalUser.password;

    return res.status(200).json(finalUser);
};

export default getCurrentUser;
