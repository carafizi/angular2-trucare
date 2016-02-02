import {OptionValue} from "./OptionValue.ts";
import {VoidConfig} from "./VoidConfig";
export interface AllergyConfiguration {
    voidConfig: VoidConfig;
    allergyOptions: OptionValue[];
    reactionOptions:OptionValue[];
    severityOptions:OptionValue[];
    sourceOptions:OptionValue[];
}