import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('entity', (table) => {
        table.increments('id').primary();

        table.string('name');
        table.string('entity_type');
        table.smallint('level');

        table.smallint('hit_points').notNullable();

        table.smallint('defense').notNullable();
        table.smallint('agility').notNullable();
        table.smallint('magic').notNullable();
        table.smallint('strength').notNullable();

        table.timestamp('deletedAt').nullable();
        table.timestamps(true, true, true);

        table.integer('player__id').unsigned().nullable();
        table.foreign('player__id').references('id').inTable('player');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('entity');
}