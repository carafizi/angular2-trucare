import {Injectable} from 'angular2/core';
import {Member} from "../model/member/Member";
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';
import {AppConfig} from "../AppConfig";
import {Headers} from "angular2/http";
import {CreateMedicationRequest} from "../model/clinical/CreateMedicationRequest";
import {MedicationSearchCriteria} from "../model/clinical/MedicationSearchCriteria";

@Injectable()
export class MedicationService {

    private appConfig = new AppConfig();

    constructor(private _http:Http) {}

    getMemberMedication(member:Member, medicationId:string){
        return this._http.get(this.appConfig.url + "/members/" + member.id +"/medications/" + medicationId, this.appConfig.headers).map((res:Response) => res.json());
    }

    getMemberMedicationByCodeId(member:Member, medicationCodeId:string){
        return this._http.get(this.appConfig.url + "/members/" + member.id +"/medications/regimen/" + medicationCodeId, this.appConfig.headers).map((res:Response) => res.json());
    }

    searchMemberMedications(member:Member, medicationSearchCriteria:MedicationSearchCriteria){
        return this._http.post(this.appConfig.url +"/members/" + member.id +"/medications-search", JSON.stringify(medicationSearchCriteria), {headers:this.appConfig.headers})
            .map((res:Response) => res.json());
    }

    searchDrugs(drugName:string){
        return this._http.get(this.appConfig.url + "/drugs/?name=" + drugName, this.appConfig.headers).map((res:Response) => res.json());
    }

    getMedicationConfiguration(){
        return this._http.get(this.appConfig.url + "/medication-configuration/", this.appConfig.headers).map((res:Response) => res.json());
    }


    addMedication(member:Member, createMedicationRequest:CreateMedicationRequest){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this._http.post(this.appConfig.url + "/members/" + member.id +"/medications", JSON.stringify(createMedicationRequest), {headers:headers}).map((res:Response) => res);
    }
}