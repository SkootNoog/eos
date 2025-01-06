import {BaseModel} from "./base.model";
import {RelationMappings} from "objection";
import {Provider} from "@nestjs/common";

export type EncounterJson = any;

export class Encounter extends BaseModel {
    static get tableName() {
        return 'encounter';
    }

    encounter!: EncounterJson;


    static get relationMappings(): RelationMappings {
        return {

        };
    }
}

export declare type EncounterModel = typeof Encounter;

export const EncounterProvider: Provider = {
    provide: Encounter,
    useValue: Encounter,
};