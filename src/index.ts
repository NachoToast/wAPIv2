import express from 'express';
import config from './config';
import { customErrorHandler, customRateLimiter } from './middleware';

const app = express();

app.use(customErrorHandler);
app.use(customRateLimiter);

app.set('trust proxy', config.numProxies);

app.get('/', (_, res) => res.status(200).json({ startTime: config.startedAt, version: config.version }));

app.get('/ip', (req, res) => res.status(200).send(req.ip));

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});
