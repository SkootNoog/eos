import {BaseModel} from "./base.model";
import {Model, RelationMappings} from "objection";
import {PlayerModel} from "./player.model";
import {Provider} from "@nestjs/common";

export class UserModel extends BaseModel {
    static get tableName() {
        return 'users';
    }

    username!: string;
    email!: string;
    players!: PlayerModel[];


    static get relationMappings(): RelationMappings {
        return {
            players: {
                relation: Model.HasManyRelation,
                modelClass: PlayerModel,
                join: {
                    from: `${UserModel.tableName}.id`,
                    // through: { // Many to Many example!!!!!!!!!
                    //     from: `${User.tableName}_${Player.tableName}.user__id`,
                    //     to: `${User.tableName}_${Player.tableName}.player__id`,
                    // },
                    to: `${PlayerModel.tableName}.id`,
                },
            },
        };
    }
}

export declare type UserModelType = typeof UserModel;

export const UserModelProvider: Provider = {
    provide: UserModel,
    useValue: UserModel,
};