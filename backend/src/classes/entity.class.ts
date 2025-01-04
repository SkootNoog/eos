import Knex from "knex";

export abstract class Entity {
    private _id: number;
    private _name: string;
    private _level: number;
    private _hit_points: number;
    private _defense: number;
    private _agility: number;
    private _magic: number;
    private _strength: number;
    private _entity_type__id: number;
    private _entity_type: string;

    constructor(id: number, knex: ReturnType<typeof Knex>) {
        knex
            .select(
                'entity.id',
                'entity.name',
                'entity.level',
                'entity.hit_points',
                'entity.defense',
                'entity.agility',
                'entity.magic',
                'entity.strength',
                'entity.entity_type__id',
                'entity_type.name as entity_type',
            ).from('entity')
            .innerJoin('entity_type', 'entity.entity_type__id', '=', 'entity_type.id')
            .where('id', id).then((data) => {
            this._id = data.id;
            this._name = data.name;
            this._level = data.level;
            this._hit_points = data.hit_points;
            this._defense = data.defense;
            this._agility = data.agility;
            this._magic = data.magic;
            this._strength = data.strength;
            this._entity_type = data.entity_type;
            this._entity_type__id = data.entity_type__id;
        })
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get level() {
        return this._level;
    }

    public get hitPoints() {
        return this._hit_points;
    }

    public get defense() {
        return this._defense;
    }

    public get agility() {
        return this._agility;
    }

    public get magic() {
        return this._magic;
    }

    public get strength() {
        return this._strength;
    }

    public get entity_type() {
        return this._entity_type;
    }

    public get entity_type__id() {
        return this._entity_type__id;
    }

}