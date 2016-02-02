import {MEMBERS} from '../data/members-list';
import {Injectable} from 'angular2/core';
import {Member} from "../model/Member";
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';
import {CreateDiagnosisRequest} from "../model/CreateDiagnosisRequest";
import {DiagnosisSearchCriteria} from "../model/DiagnosisSearchCriteria";
import {CreateAllergyRequest} from "../model/CreateAllergyRequest";
import {AppConfig} from "../AppConfig";
import {Headers} from "angular2/http";

@Injectable()
export class AllergyService {

    private appConfig = new AppConfig();

    constructor(private _http:Http) {}

    getAllergies(member:Member) {
        return this._http.get(this.appConfig.url + "/members/" + member.id +"/allergies", this.appConfig.headers).map((res:Response) => res.json());
    }

    getAllergyConfiguration(){
        return this._http.get(this.appConfig.url + "/allergy-configuration/", this.appConfig.headers).map((res:Response) => res.json());
    }

    addAllergy(member:Member, createAllergyRequest:CreateAllergyRequest){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this._http.post(this.appConfig.url + "/members/" + member.id +"/allergies", JSON.stringify(createAllergyRequest), {headers:headers}).map((res:Response) => res.json());
    }
}