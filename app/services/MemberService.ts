import {MEMBERS} from '../data/members-list';
import {Injectable} from 'angular2/core';
import {Member} from "../model/member/Member";
import {ALLERGIES} from "../data/allergies-list";
import {DIAGNOSES} from "../data/diagnoses-list";
import {ALLERGIES_RICHARD} from "../data/allergies-list";
import {ALLERGIES_DESMOND} from "../data/allergies-list";
import {DIAGNOSES_RICHARD} from "../data/diagnoses-list";
import {DIAGNOSES_DESMOND} from "../data/diagnoses-list";
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {CreateAllergyRequest} from "../model/clinical/CreateAllergyRequest";
import {CreateDiagnosisRequest} from "../model/clinical/CreateDiagnosisRequest";
import {MemberSearchCriteria} from "../model/member/MemberSearchCriteria";
import {DiagnosisSearchCriteria} from "../model/clinical/DiagnosisSearchCriteria";
import {AppConfig} from "../AppConfig";

@Injectable()
export class MemberService {

    private appConfig = new AppConfig();

    constructor(private _http:Http) {}

    getMembers() {
        return this._http.get(this.appConfig.url + "/member-list", this.appConfig.headers).map((res:Response) => res.json());
    }

    searchMembers(memberSearchCriteria:MemberSearchCriteria){
        return this._http.post(this.appConfig.url + "/members-search", JSON.stringify(memberSearchCriteria), {headers:this.appConfig.headers}).map((res:Response) => res.json());
    }


    addMember(memberId:string){
        return this._http.put(this.appConfig.url + "/member-list/" + memberId, "", {headers:this.appConfig.headers}).map((res:Response) => res.json());
    }

    deleteMember(memberId:string){
        return this._http.delete(this.appConfig.url + "/member-list/" + memberId, {headers:this.appConfig.headers}).map((res:Response) => res.json());
    }
}
