export class CreateMedicationRequest{
    drugId:string;
    frequencyOption:string="qd_daily";
    adjustedRouteOption:string;
    prescriberId:string;
    adjustedDose:string;
    procurementMethodOption:string;
}