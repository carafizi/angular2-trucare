import {OptionValue} from "./../common/OptionValue.ts";
export class CreateDiagnosisRequest {
    diagnosisCodeId: string;
    primaryDiagnosis:boolean = false;
    reportedBy:string = "trumobile";
    reportedDate:string = "2016-01-01";
}
