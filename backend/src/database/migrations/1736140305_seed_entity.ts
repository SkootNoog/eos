import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    // Adventurers
    await knex('entity').insert([
        {
            name: 'Alexander Arnuanna',
            level: 1,
            hit_points: 10,
            defense: 2,
            agility: 1,
            magic: 2,
            strength: 3,
            player__id: 1,
            entity_type: 'adventurer',
        },
        {
            name: 'Garth',
            level: 1,
            hit_points: 10,
            defense: 2,
            agility: 4,
            magic: 1,
            strength: 1,
            player__id: 1,
            entity_type: 'adventurer',
        },
        {
            name: 'Justin Case',
            level: 1,
            hit_points: 10,
            defense: 2,
            agility: 1,
            magic: 4,
            strength: 1,
            player__id: 1,
            entity_type: 'adventurer',
        },
        {
            name: 'Tayo',
            level: 1,
            hit_points: 10,
            defense: 2,
            agility: 2,
            magic: 3,
            strength: 1,
            player__id: 2,
            entity_type: 'adventurer',
        },
    ]);

    await knex('entity').insert([
        {
            name: 'Goblin Minion',
            level: 1,
            hit_points: 3,
            defense: 0,
            agility: 1,
            magic: 0,
            strength: 0,
            player__id: null,
            entity_type: 'monster',
        },
        {
            name: 'Goblin Mystic',
            level: 1,
            hit_points: 3,
            defense: 1,
            agility: 0,
            magic: 1,
            strength: 0,
            player__id: null,
            entity_type: 'monster',
        },
    ]);
}