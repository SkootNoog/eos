import {Inject, Injectable, Logger, OnApplicationShutdown, OnModuleInit} from '@nestjs/common';
import { Knex } from 'knex';
import { Model } from 'objection';
import { KnexMigratorService } from './knex-migrator.service';

export const KnexConnection = '__KNEX_CONNECTION__';

@Injectable()
export class KnexService implements OnApplicationShutdown, OnModuleInit {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @Inject(KnexConnection)
        private readonly knexConn: Knex,
        private readonly migrator: KnexMigratorService,
    ) {
        Model.knex(knexConn);
    }

    async onModuleInit() {
        await this.migrator.runMigrations(this.knexConn);
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