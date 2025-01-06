import {Knex} from "knex";

// Entity type: Adventurer, Monster, NPC, etc.
export async function buildEntityTypeTable(knex: Knex): Promise<void> {
    await knex.schema.createTable('entity_type', (table) => {
        table.increments('id').primary();

        table.string('name'); // adventurer, monster, npc

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').defaultTo('9999-12-31 23:59:59');
    });
}

export async function destroyEntityTypeTable(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('entity_type');
}

export async function buildEntityTable(knex: Knex): Promise<void> {
    await knex.schema.createTable('entity', (table) => {
        table.increments('id').primary();

        table.string('name');
        table.smallint('level');

        table.smallint('hit_points').notNullable();

        table.smallint('defense').notNullable();
        table.smallint('agility').notNullable();
        table.smallint('magic').notNullable();
        table.smallint('strength').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').defaultTo('9999-12-31 23:59:59');

        table.integer('entity_type__id').unsigned().notNullable();
        table.foreign('entity_type__id').references('id').inTable('entity_type');
        table.integer('player__id').unsigned();
        table.foreign('player__id').references('id').inTable('player');
    });
}

export async function destroyEntityTable(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('entity');
}

export async function buildEncounterTable(knex: Knex): Promise<void> {
    await knex.schema.createTable('encounter', (table) => {
        table.increments('id').primary();

        table.jsonb('encounter');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').defaultTo('9999-12-31 23:59:59');
    });
}

export async function destroyEncounterTable(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('encounter');
}
