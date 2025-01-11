import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import {KnexService, KnexConnection} from "./Knex.service";
import {EncounterModelProvider} from "./model/encounter.model";
import {PlayerModelProvider} from "./model/player.model";
import {UserModelProvider} from "./model/user.model";
import {EntityModelProvider} from "./model/entity.model";
import {KnexMigratorService} from "./knex-migrator.service";

const models = [
    UserModelProvider,
    PlayerModelProvider,
    EntityModelProvider,
    EncounterModelProvider,
];

@Global()
@Module({
    providers: [
        {
            provide: KnexConnection,
            useFactory: async () =>
                Knex({
                    client: 'pg',
                    connection: KnexService.DataSourceUri({
                        host: process.env.DB_HOST,
                        port: process.env.DB_PORT,
                        username: process.env.DB_USERNAME,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_DATABASE_NAME,
                        schema: process.env.DB_SCHEMA,
                    }),
                }),
        },
        KnexService,
        KnexMigratorService,
        ...models,
    ],
    exports: [KnexService, ...models],
})
export class DatabaseModule {}