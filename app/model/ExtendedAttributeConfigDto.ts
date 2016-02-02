import {OptionValue} from "./OptionValue";
export class ExtendedAttributeConfigDto{
    id:string;
    label:string;
    name:string;
    type:string;
    defaultDomainValue:OptionValue;
    enabled:boolean;
    //requiredType:RequiredType;
    //attributeDef:ExtendedFieldDef;
    //requiredType:RequiredType;
    ordinal:number;
}