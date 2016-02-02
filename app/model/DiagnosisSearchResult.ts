import {DiagnosisCode} from "./DiagnosisCode.ts";
export interface DiagnosisSearchResult {
    id: string;
    reportedDate: string;
    reportedBy: string;
    diagnosisCode:DiagnosisCode;
    primaryDiagnosis: boolean;
    voidInfoExists:boolean;
}