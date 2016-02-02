import {SearchCriteria} from "./SearchCriteria";
export class MedicationSearchCriteria extends SearchCriteria{
    drugId:string;
    status:string="OPEN";
    //reviewDateFrom:string="2015-01-01";
    //reviewDateTo:string="2016-02-02";
    //reviewedById:string="";
    includeVoided:boolean=false;
}