import Knex from "knex";
import {buildPlayerTable, buildUsersTable} from "./11-user-tables";
import {buildEncounterTable, buildEntityTable, buildEntityTypeTable} from "./12-entity-tables";
import {seedPlayer, seedUsers} from "../seed/1-user";
import {seedAdventurers, seedEntityType, seedMonsters} from "../seed/2-entity";


const knex = Knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
    },
});

createTables(knex).then(()=> {
    createSeedData(knex);
});


async function createTables(knex: any): Promise<void> {
    await buildUsersTable(knex);
    await buildPlayerTable(knex);

    await buildEntityTypeTable(knex);
    await buildEntityTable(knex);
    await buildEncounterTable(knex);
}

async function createSeedData(knex: any): Promise<void> {
    await seedUsers(knex);
    await seedPlayer(knex);

    await seedEntityType(knex);
    await seedAdventurers(knex);
    await seedMonsters(knex);
}



