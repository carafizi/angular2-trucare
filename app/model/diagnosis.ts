import {OptionValue} from "./option.value";
import {DiagnosisCode} from "./diagnosis.code";
export interface Diagnosis {
    id: string;
    reportedBy: string;
    diagnosisCode:DiagnosisCode;
    primaryDiagnosis: boolean;
    reportedDate: string;
}