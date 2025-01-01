//
// import { Injectable } from '@nestjs/common';
//
// @Injectable()
// export class DatabaseService {
//
//     knex = require('knex')({
//         client: 'pg',
//         connection: {
//             host: process.env.DB_HOST,
//             port: process.env.DB_PORT,
//             database: process.env.DB_DATABASE_NAME,
//             user: process.env.DB_USERNAME,
//             password: process.env.DB_PASSWORD,
//         },
//     });
// //
// }

import {
    Inject,
    Injectable,
    Logger,
    OnApplicationShutdown,
} from '@nestjs/common';

import { Knex } from 'knex';

export const KnexConnection = '__KNEX_CONNECTION__';

@Injectable()
export class KnexService implements OnApplicationShutdown {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @Inject(KnexConnection)
        private readonly knexConn: Knex,
    ) {

    }

    get db() {
        return this.knexConn;
    }

    async onApplicationShutdown() {
        this.logger.log('Starting shutdown');
        await this.knexConn.destroy();
        this.logger.log('Destroyed');
    }

    static DataSourceUri({
        username,
        password,
        host,
        port,
        database,
        schema,
        poolTimeout,
        connectionLimit,
    }: {
        username: string;
        password: string;
        host: string;
        port: string;
        database: string;
        schema: string;
        poolTimeout?: number;
        connectionLimit?: number;
    }) {
        const params = [
            `schema=${schema}`,
            connectionLimit && `connection_limit=${connectionLimit}`,
            poolTimeout != null && `pool_timeout=${poolTimeout}`,
        ]
            .filter(Boolean)
            .join('&');
        return `postgresql://${username}:${password}@${host}:${port}/${database}?${params}`;
    }
}