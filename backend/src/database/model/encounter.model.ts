import {BaseModel} from "./base.model";
import {RelationMappings} from "objection";
import {Provider} from "@nestjs/common";

export type EncounterJson = any;

export class EncounterModel extends BaseModel {
    static get tableName() {
        return 'encounter';
    }

    encounter!: EncounterJson;


    static get relationMappings(): RelationMappings {
        return {

        };
    }
}

export declare type EncounterModelType = typeof EncounterModel;

export const EncounterModelProvider: Provider = {
    provide: EncounterModel,
    useValue: EncounterModel,
};