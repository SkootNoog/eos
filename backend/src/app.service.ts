import { Injectable, OnApplicationBootstrap} from '@nestjs/common';
import { KnexService} from "./database/Knex.service";
import {
    buildPlayerTable,
    buildUsersTable,
    destroyPlayerTable,
    destroyUsersTable
} from "./database/migrations/schema/11-user-tables";
import {
    buildEncounterTable,
    buildEntityTable,
    buildEntityTypeTable, destroyEncounterTable, destroyEntityTable, destroyEntityTypeTable
} from "./database/migrations/schema/12-entity-tables";
import {seedPlayer, seedUsers} from "./database/migrations/seed/1-user";
import {seedAdventurers, seedEntityType, seedMonsters} from "./database/migrations/seed/2-entity";
import Knex from "knex";

@Injectable()
export class AppService implements OnApplicationBootstrap{
    constructor(private knexService: KnexService) {}

    // async testTest() {
    //     return this.knexService.db('test').where('id', 1).first();
    //     // const knex = this.knexService.db;
    //     // return knex('test').where('id', 1).first();
    // }

    async onApplicationBootstrap() {
        // let asdf = await this.testTest();


        let knex = this.knexService.db;

        if (process.env.DEV !== 'true' || process.env.PROD === 'true') {
            return;
        }

        console.log('Destroy DB Tables');
        await this.destroyDb(knex);
        console.log('Build DB Tables');
        await this.buildDb(knex);
        console.log('Seed DB');
        await this.createSeedData(knex);
    }

    async buildDb(knex: any) {
        await this.createTables(knex);
    }

    async destroyDb(knex: any) {
        await destroyEncounterTable(knex);
        await destroyEntityTable(knex);
        await destroyEntityTypeTable(knex);
        await destroyPlayerTable(knex);
        await destroyUsersTable(knex);
    }

    async createTables(knex: any): Promise<void> {
        await buildUsersTable(knex);
        await buildPlayerTable(knex);

        await buildEntityTypeTable(knex);
        await buildEntityTable(knex);
        await buildEncounterTable(knex);
    }

    async createSeedData(knex: any): Promise<void> {
        await seedUsers(knex);
        await seedPlayer(knex);

        await seedEntityType(knex);
        await seedAdventurers(knex);
        await seedMonsters(knex);
    }
}
