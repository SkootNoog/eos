import Knex from "knex";
import {Entity} from "./entity.class";

export class Adventurer extends Entity {
    constructor(id: number, knex: ReturnType<typeof Knex>) {
        super(id, knex)
    }
}