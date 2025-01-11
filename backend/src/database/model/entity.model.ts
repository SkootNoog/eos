import {BaseModel} from "./base.model";
import {RelationMappings} from "objection";
import {Provider} from "@nestjs/common";

export class EntityModel extends BaseModel {
    static get tableName() {
        return 'entity';
    }

    name!: string;
    level!: number;
    hit_points!: number;
    defense!: number;
    agility!: number;
    magic!: number;
    strength!: number;
    entity_type: string;
    player__id!: number;

    static get relationMappings(): RelationMappings {
        return {
            // player: {
            //     relation: Model.BelongsToOneRelation,
            //     modelClass: Player,
            //     join: {
            //         from: `${Entity.tableName}.player__id`,
            //         to: `${Player.tableName}.id`,
            //     },
            // },
        };
    }
}

// This is for type hinting the Objection model functions/etc.
export declare type EntityModelType = typeof EntityModel;
// The EntityModel is the type of the Entity class, which is the Objection model

export const EntityModelProvider: Provider = {
    provide: EntityModel,
    useValue: EntityModel,
};