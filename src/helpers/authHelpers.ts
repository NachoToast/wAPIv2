import { sign, verify } from 'jsonwebtoken';
import { userDatabase } from '..';
import config from '../config';
import User from '../types/User';

/** Creates a JSON web token containing the provided username. */
export function makeSiteToken(username: string): string {
    return sign({ username }, config.jwtSecret, { expiresIn: config.jwtDuration });
}

/** Checks a token is valid, returning the user associated with it. */
export function validateSiteToken(token: string): User | null {
    if (token.toLowerCase().startsWith('bearer ')) {
        token = token.slice('bearer '.length);
    }

    try {
        const payload = verify(token, config.jwtSecret);

        // we always sign with an object as the payload
        if (typeof payload === 'string') return null;

        // tokens we generate also always have an expiration date
        if (payload.exp === undefined) return null;

        // token expired
        if (payload.exp * 1000 < Date.now()) return null;

        // unexpected payload shape
        if (typeof payload.username !== 'string') return null;

        const user = userDatabase.get(payload.username.toLowerCase());

        // token is valid but no user was found with that username
        return user;
    } catch (error) {
        // unverifiable token, normally syntactically invalid
        return null;
    }
}
