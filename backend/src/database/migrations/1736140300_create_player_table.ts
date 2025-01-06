import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('player', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.timestamp('deletedAt').nullable();
        table.timestamps(true, true, true);

        table.integer('user__id').unsigned();
        // table.foreign('user__id').references('id').inTable('users');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('player');
}