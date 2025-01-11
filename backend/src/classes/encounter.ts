import {EncounterModel} from "@models";


export interface Turnable {
    takeTurn(e: Encounter): void;
}

export type Combatant = Turnable; // & Attackable

export class Encounter {

    constructor(private encounter: EncounterModel) {

    }

    addCombatant(combatants: Combatant[]) {
        // TODO:
    }


}