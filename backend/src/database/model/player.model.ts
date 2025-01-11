import {BaseModel} from "./base.model";
import {Model, RelationMappings} from "objection";
import {EntityModel} from "./entity.model";
import {EncounterModel} from "./encounter.model";
import {Provider} from "@nestjs/common";

export class PlayerModel extends BaseModel {
    static get tableName() {
        return 'player';
    }

    name!: string;
    user__id!: number;
    entities!: EntityModel[];
    encounters!: EncounterModel[];


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
                modelClass: EntityModel,
                join: {
                    from: `${PlayerModel.tableName}.id`,
                    to: `${EntityModel.tableName}.player__id`,
                }
            },
            encounters: {
                relation: Model.HasManyRelation,
                modelClass: EncounterModel,
                join: {
                    from: `${PlayerModel.tableName}.id`,
                    through: { // Many to Many example!!!!!!!!!
                        from: `${PlayerModel.tableName}_${EncounterModel.tableName}.player__id`,
                        to: `${PlayerModel.tableName}_${EncounterModel.tableName}.encounter__id`,
                    },
                    to: `${EncounterModel.tableName}.id`,
                },
            },
        };
    }
}

export declare type PlayerModelType = typeof PlayerModel;

export const PlayerModelProvider: Provider = {
    provide: PlayerModel,
    useValue: PlayerModel,
};