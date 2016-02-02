import {OptionValue} from "./option.value";
import {VoidConfig} from "./void-config";
export interface AllergyConfiguration {
    voidConfig: VoidConfig;
    allergyOptions: OptionValue[];
    reactionOptions:OptionValue[];
    severityOptions:OptionValue[];
    sourceOptions:OptionValue[];
}