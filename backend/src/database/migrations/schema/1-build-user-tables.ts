import { Knex } from 'knex';

export async function buildUsersTable(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email').unique();
        table.string('username');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').defaultTo('9999-12-31 23:59:59');
    });
}

export async function buildPlayerTable(knex: Knex): Promise<void> {
    await knex.schema.createTable('player', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').defaultTo('9999-12-31 23:59:59');

        table.integer('user__id').unsigned();
        table.foreign('user__id').references('id').inTable('users');
    });
}



