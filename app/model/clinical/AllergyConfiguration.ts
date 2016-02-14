import {OptionValue} from "./../common/OptionValue.ts";
import {VoidConfig} from "./../common/VoidConfig";
export class AllergyConfiguration {
    voidConfig: VoidConfig;
    allergyOptions: OptionValue[];
    reactionOptions:OptionValue[];
    severityOptions:OptionValue[];
    sourceOptions:OptionValue[];
}