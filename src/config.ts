import { existsSync } from 'fs';

export interface Config {
    /** @default 5000 */
    port: number;

    /** @default 0 */
    numProxies: 0;

    /** @default 30 */
    maxRequestsPerMinute: number;

    rateLimitBypassTokens: string[];

    // autogenerate values below this point, do not fill these in
    // or do, it won't matter either way

    version: string;

    startedAt: string;
}

const partialConfig: Partial<Config> = existsSync('config.json')
    ? require('../config.json')
    : require('../config.example.json');

// apply defaults
const config: Config = {
    port: partialConfig.port ?? 5000,
    numProxies: partialConfig.numProxies ?? 0,
    maxRequestsPerMinute: partialConfig.maxRequestsPerMinute ?? 30,
    rateLimitBypassTokens: partialConfig.rateLimitBypassTokens ?? [],

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    version: process.env.NPM_VERSION || require('../package.json').version,
    startedAt: new Date().toISOString(),
};

export default config;
