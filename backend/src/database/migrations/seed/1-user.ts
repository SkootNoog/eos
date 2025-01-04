import {Knex} from "knex";

export async function seedUsers(knex: Knex): Promise<void> {
    await knex('users').insert([
        {email: 'glen@ra.roar', username: 'revlis'},
        {email: 'gas@can.beans', username: 'beans'},
    ]);
}

export async function seedPlayer(knex: Knex): Promise<void> {
    await knex('player').insert([
        {name: 'Garth'},
        {name: 'Nicol Bolas'},
    ]);
}