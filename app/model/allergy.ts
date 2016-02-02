import {OptionValue} from "./OptionValue.ts";
export interface Allergy {
    id: string;
    allergy: OptionValue;
    reaction:OptionValue;
    dateIdentified: string;
    severity: OptionValue;
    active:boolean;
}
