import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex('player').insert([
        {name: 'Garth', user__id: '1'},
        {name: 'Nicol Bolas', user__id: '2'},
    ]);
}