import {SearchCriteria} from "./../common/SearchCriteria";
export class DiagnosisSearchCriteria extends SearchCriteria{
    primaryOnly:boolean = false;
    includeOpen:boolean = true;
    includeClosed:boolean = false;
    includeVoided:boolean = false;
    reverseChronologicalOrder:boolean = false;
}