
export class DiceRoller {

    public static roll(size: number, modifiers: number /* min: number = 1, max: number = null */) {
        let roll_num = Math.floor(Math.random() * size) + 1;
        roll_num += modifiers;
        return roll_num;
    }
}