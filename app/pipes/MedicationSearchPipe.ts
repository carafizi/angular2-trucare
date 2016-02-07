import {Pipe} from "angular2/core";
import {Injectable} from "angular2/core";
import {PipeTransform} from "angular2/core";
import {MedicationSearchResult} from "../model/clinical/MedicationSearchResult";
@Pipe({
    name: 'medicationSearchPipe',
    pure: false
})
@Injectable()
export class MedicationSearchPipe implements PipeTransform {
    transform(meds: MedicationSearchResult[], args: any[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        console.log("meds in pipe="+JSON.stringify(meds));
        console.log("args in pipe="+JSON.stringify(args));
        if(meds) {
            return meds.filter(med => med.drug.name.includes(args[0].name));
        }else{
            return meds;
        }
    }
}