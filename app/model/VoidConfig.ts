import {OptionValue} from "./OptionValue.ts";
export interface VoidConfig {
    voidReasonFieldLabel: string;
    voidReasonRequired: boolean;
    voidReasonOptionValues:OptionValue[];
}