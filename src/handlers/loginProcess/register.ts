import { RequestHandler } from 'express';
import { userDatabase } from '../..';
import config from '../../config';
import User from '../../types/User';
import { hashSync } from 'bcrypt';
import { makeSiteToken } from '../../helpers/authHelpers';
import Permissions from '../../types/Permissions';

const register: RequestHandler = (req, res) => {
    const { name, password } = req.body;

    if (typeof name !== 'string' || typeof password !== 'string') {
        return res.sendStatus(400);
    }

    if (password.length < 4) {
        return res.send(403).send('Password too short (< 4 chars)');
    }

    // username validation
    if (!config.usernameValidator.test(name)) {
        return res.status(403).send(`Username does not match ${config.usernameValidator}`);
    }

    // username taken
    if (userDatabase.has(name.toLowerCase())) {
        return res.status(403).send('Username taken');
    }

    const user: User = {
        name,
        password: hashSync(password, 10),
        latestIp: req.ip,
        permissions: Permissions.Comment,
        registered: new Date().toISOString(),
        lastLoginOrRefresh: new Date().toISOString(),
        posts: 0,
        comments: 0,
    };

    userDatabase.set(user);

    return res.status(201).send(makeSiteToken(name));
};

export default register;
