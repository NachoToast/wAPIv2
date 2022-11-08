import cors from 'cors';

export default cors({
    exposedHeaders: [
        'RateLimit-Limit',
        'RateLimit-Remaining',
        'RateLimit-Reset',
        'Retry-After',
        'RateLimit-Bypass-Response',
    ],
});
