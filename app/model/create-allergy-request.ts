import {OptionValue} from "./option.value";
export class CreateAllergyRequest {
    allergyOptionValueId: string;
    reactionOptionValueId:string;
    severityOptionValueId:string;
    active:boolean;
    allergyDetail:string;
    dateIdentified:string;
    constructor(details:string){
        this.allergyDetail = details;
        this.dateIdentified = "2016-01-01";
        this.active=true;
    }

}
