import {User} from "../model/User";
import {Drug} from "../model/Drug";
import {OptionValue} from "./OptionValue";
export class MedicationSearchResult{
    id:string;
    dateAdded:string;
    active:boolean;
    lastReviewedDate:string;
    voidInfoExists:boolean;
    lastReviewer:User;
    lastRegimenCreatedDate:string;
    frequency:OptionValue;
    route:OptionValue;
    routeOtherDescription:string;
    frequencyOther:string;
    regimenStartDate:string;
    regimenEndDate:string;
    providerLocation:string;
    prescriber:string;
    procurementMethod:OptionValue;
    medicationCodeId:string;
    drug:Drug;
    //voidInfo:VoidInfo;
    createdDate:string;
    addedDate:string;
}