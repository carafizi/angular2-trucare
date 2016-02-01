import {DiagnosisCode} from "./diagnosis.code";
export interface DiagnosisSearchResult {
    id: string;
    reportedDate: string;
    reportedBy: string;
    diagnosisCode:DiagnosisCode;
    primaryDiagnosis: boolean;
    voidInfoExists:boolean;
}