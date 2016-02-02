export class DiagnosisSearchRequest {
    startIndex:number = 0;
    length:number = 10;
    goToLastPage:boolean = false;
    primaryOnly:boolean = false;
    includeOpen:boolean = true;
    includeClosed:boolean = false;
    includeVoided:boolean = false;
    reverseChronologicalOrder:boolean = false;
}