import {FieldConfig} from "./FieldConfig";
import {OptionValue} from "./OptionValue";
export class OptionGroupFieldConfig extends FieldConfig{
    optionValues:OptionValue[];
    defaultOptionValue:OptionValue;
}