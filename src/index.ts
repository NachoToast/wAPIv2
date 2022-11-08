import express from 'express';
import config from './config';
import { corsHandler, customErrorHandler, customRateLimiter } from './middleware';
import swaggerUi from 'swagger-ui-express';
import Database from './classes/Database';
import User from './types/User';
import Post from './types/Post';
import { login, refresh, register } from './handlers/loginProcess';
import { getAllUsers, getCurrentUser, getUserByName, setUserPermissions } from './handlers/userManagement';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const apiSpec = require('../openapi.json');

const app = express();

app.use(express.json());
app.use(customErrorHandler);

app.use(corsHandler);
app.use(customRateLimiter);

app.set('trust proxy', config.numProxies);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));
app.use('/spec', express.static('openapi.json'));

app.get('/', (_, res) => res.status(200).json({ startTime: config.startedAt, version: config.version }));

app.get('/ip', (req, res) => res.status(200).send(req.ip));

app.post('/login', login);
app.get('/refresh', refresh);
app.post('/register', register);

app.get('/users', getAllUsers);
app.get('/users/@me', getCurrentUser);
app.get('/users/:name', getUserByName);
app.patch('/users/:name', setUserPermissions);

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});

export const userDatabase = new Database<User>('users', (user) => user.name.toLowerCase());
export const postsDatabase = new Database<Post>('posts', (post) => post.id.toLowerCase());
