import {MEMBERS} from '../data/members-list';
import {Injectable} from 'angular2/core';
import {Member} from "../model/member/Member";
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';
import {CreateDiagnosisRequest} from "../model/clinical/CreateDiagnosisRequest";
import {DiagnosisSearchCriteria} from "../model/clinical/DiagnosisSearchCriteria";
import {AppConfig} from "../AppConfig";
import {Headers} from "angular2/http";

@Injectable()
export class DiagnosisService {

    private appConfig = new AppConfig();

    constructor(private _http:Http) {
    }

    searchDiagnosisCodes(diagnosisCodeCode:string, diagnosisCodeName:string){
        return this._http.get(this.appConfig.url +"/diagnosis-codes?code=" + diagnosisCodeCode + "&name=" + diagnosisCodeName, this.appConfig.headers).map((res:Response)=>res.json());
    }

    searchMemberDiagnoses(member:Member, diagnosisSearchCriteria:DiagnosisSearchCriteria) {
        return this._http.post(this.appConfig.url +"/members/" + member.id +"/diagnoses-search", JSON.stringify(diagnosisSearchCriteria), {headers:this.appConfig.headers})
            .map((res:Response) => res.json());
    }


    addDiagnosis(member:Member, createDiagnosisRequest:CreateDiagnosisRequest){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this._http.post(this.appConfig.url + "/members/" + member.id +"/diagnoses", JSON.stringify(createDiagnosisRequest), {headers:headers}).map((res:Response) => res);
    }
}