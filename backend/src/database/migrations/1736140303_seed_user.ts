import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex('users').insert([
        {email: 'glen@ra.roar', username: 'revlis'},
        {email: 'gas@can.beans', username: 'beans'},
    ]);
}