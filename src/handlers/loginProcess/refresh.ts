import { RequestHandler } from 'express';
import { userDatabase } from '../..';
import { makeSiteToken, validateSiteToken } from '../../helpers/authHelpers';

const refresh: RequestHandler = (req, res) => {
    const authHeader = req.get('Authorization');

    if (authHeader === undefined) return res.sendStatus(401);

    const user = validateSiteToken(authHeader);

    if (user === null) return res.sendStatus(400);

    user.latestIp = req.ip;
    user.lastLoginOrRefresh = new Date().toISOString();

    userDatabase.set(user);

    return res.status(200).send(makeSiteToken(user.name));
};

export default refresh;
