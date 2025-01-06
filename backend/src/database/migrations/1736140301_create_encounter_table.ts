import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('encounter', (table) => {
        table.increments('id').primary();
        table.jsonb('encounter');

        table.timestamp('deletedAt').nullable();
        table.timestamps(true, true, true);
    });

    await knex.schema.createTable('player_encounter', (table) => {
        table.integer('player__id').unsigned();
        // table.foreign('player__id').references('id').inTable('player');

        table.integer('encounter__id').unsigned();
        // table.foreign('encounter__id').references('id').inTable('encounter');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('player_encounter');
    await knex.schema.dropTable('encounter');
}