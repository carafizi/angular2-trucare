import {OptionValue} from "./../common/OptionValue.ts";
import {DiagnosisCode} from "./DiagnosisCode.ts";
export interface Diagnosis {
    id: string;
    reportedBy: string;
    diagnosisCode:DiagnosisCode;
    primaryDiagnosis: boolean;
    reportedDate: string;
}