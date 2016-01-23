import {OptionValue} from "./option.value";
export interface Allergy {
    id: string;
    allergy: OptionValue;
    reaction:OptionValue;
    dateIdentified: string;
    severity: OptionValue;
    active:boolean;
}
