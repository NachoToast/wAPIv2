import Permissions from './Permissions';

export default interface User {
    name: string;

    password: string;

    latestIp: string;

    permissions: Permissions;

    registered: string;

    lastLoginOrRefresh: string;

    posts: number;

    comments: number;
}
