import {Knex} from "knex";

export async function seedEntityType(knex: Knex): Promise<void> {
    await knex('entity_type').insert([
        {name: 'adventurer'},
        {name: 'monster'},
        {name: 'npc'},
    ]);
}

export async function seedAdventurers(knex: Knex): Promise<void> {
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
            entity_type__id: 1,
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
            entity_type__id: 1,
        },
    ]);
}

export async function seedMonsters(knex: Knex): Promise<void> {
    await knex('entity').insert([
        {
            name: 'Gerblin',
            level: 1,
            hit_points: 4,
            defense: 0,
            agility: 1,
            magic: 0,
            strength: 0,
            player__id: null,
            entity_type__id: 2,
        },
    ]);
}