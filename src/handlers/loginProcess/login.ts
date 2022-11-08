import { compareSync } from 'bcrypt';
import { RequestHandler } from 'express';
import { userDatabase } from '../..';
import { makeSiteToken } from '../../helpers/authHelpers';

const login: RequestHandler = (req, res) => {
    const { name, password } = req.body;

    if (typeof name !== 'string' || typeof password !== 'string') {
        return res.sendStatus(400);
    }

    const user = userDatabase.get(name.toLowerCase());
    if (user === null) return res.status(403).send('Name not found');

    if (!compareSync(password, user.password)) {
        return res.status(403).send('Incorrect password');
    }

    user.latestIp = req.ip;
    user.lastLoginOrRefresh = new Date().toISOString();

    userDatabase.set(user);

    return res.status(200).send(makeSiteToken(user.name));
};

export default login;
