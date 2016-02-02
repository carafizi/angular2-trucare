import {OptionValue} from "./OptionValue.ts";
export class CreateAllergyRequest {
    allergyOptionValueId: string;
    reactionOptionValueId:string;
    severityOptionValueId:string;
    active:boolean = true;
    allergyDetail:string = "allergy detail";
    dateIdentified:string = "2016-01-01";
}
