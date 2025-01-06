import {BaseModel} from "./base.model";
import {Model, RelationMappings} from "objection";
import {Entity} from "./entity.model";
import {Encounter} from "./encounter.model";
import {Provider} from "@nestjs/common";

export class Player extends BaseModel {
    static get tableName() {
        return 'player';
    }

    name!: string;
    user__id!: number;
    entities!: Entity[];
    encounters!: Encounter[];


    static get relationMappings(): RelationMappings {
        return {
            // player: {
            //     relation: Model.BelongsToOneRelation,
            //     modelClass: User,
            //     join: {
            //         from: `${Player.tableName}.user__id`,
            //         to: `${User.tableName}.id`,
            //     },
            // },
            entities: {
                relation: Model.HasManyRelation,
                modelClass: Entity,
                join: {
                    from: `${Player.tableName}.id`,
                    to: `${Entity.tableName}.player__id`,
                }
            },
            encounters: {
                relation: Model.HasManyRelation,
                modelClass: Encounter,
                join: {
                    from: `${Player.tableName}.id`,
                    through: { // Many to Many example!!!!!!!!!
                        from: `${Player.tableName}_${Encounter.tableName}.player__id`,
                        to: `${Player.tableName}_${Encounter.tableName}.encounter__id`,
                    },
                    to: `${Encounter.tableName}.id`,
                },
            },
        };
    }
}

export declare type PlayerModel = typeof Player;

export const PlayerProvider: Provider = {
    provide: Player,
    useValue: Player,
};