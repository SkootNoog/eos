import {BaseModel} from "./base.model";
import {Model, RelationMappings} from "objection";
import {Player} from "./player.model";
import {Provider} from "@nestjs/common";

export class User extends BaseModel {
    static get tableName() {
        return 'users';
    }

    username!: string;
    email!: string;
    players!: Player[];


    static get relationMappings(): RelationMappings {
        return {
            players: {
                relation: Model.HasManyRelation,
                modelClass: Player,
                join: {
                    from: `${User.tableName}.id`,
                    // through: { // Many to Many example!!!!!!!!!
                    //     from: `${User.tableName}_${Player.tableName}.user__id`,
                    //     to: `${User.tableName}_${Player.tableName}.player__id`,
                    // },
                    to: `${Player.tableName}.id`,
                },
            },
        };
    }
}

export declare type UserModel = typeof User;

export const UserProvider: Provider = {
    provide: User,
    useValue: User,
};