import {MEMBERS} from '../data/members-list';
import {Injectable} from 'angular2/core';
import {Member} from "../model/Member";
import {ALLERGIES} from "../data/allergies-list";
import {DIAGNOSES} from "../data/diagnoses-list";
import {ALLERGIES_RICHARD} from "../data/allergies-list";
import {ALLERGIES_DESMOND} from "../data/allergies-list";
import {DIAGNOSES_RICHARD} from "../data/diagnoses-list";
import {DIAGNOSES_DESMOND} from "../data/diagnoses-list";
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {CreateAllergyRequest} from "../model/CreateAllergyRequest";
import {CreateDiagnosisRequest} from "../model/CreateDiagnosisRequest";
import {MemberSearchCriteria} from "../model/MemberSearchCriteria";
import {DiagnosisSearchCriteria} from "../model/DiagnosisSearchCriteria";

@Injectable()
export class MemberService {

    token:string;
    private fullUrl:string = "http://localhost:8082/trucare-api/6.2/api";
    private url:string = "/trucare-api/6.2/api";

    constructor(private _http:Http) {
        this.token = localStorage.getItem('token');
    }

    getMembers() {
        return Promise.resolve(MEMBERS);
    }

    getMemberAllergies(member:Member) {
        if (member.lastName === "Hume") {
            return Promise.resolve(ALLERGIES_DESMOND);
        } else if (member.lastName === "Alpert") {
            return Promise.resolve(ALLERGIES_RICHARD);
        } else {
            return Promise.resolve(ALLERGIES);
        }

    }

    getMemberDiagnoses(member:Member) {
        if (member.lastName === "Hume") {
            return Promise.resolve(DIAGNOSES_DESMOND);
        } else if (member.lastName === "Alpert") {
            return Promise.resolve(DIAGNOSES_RICHARD);
        } else {
            return Promise.resolve(DIAGNOSES);
        }

    }

    getMembersSlowly() {
        return new Promise<Member[]>(resolve =>setTimeout(()=>resolve(MEMBERS), 2000) // 2 seconds
        );
    }

    addHeaders():Headers{
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        return headers
    }

    // Uses http.get() to load members from the secure TC API
    getMembersFromTrucare() {
        return this._http.get(this.url + "/member-list", this.addHeaders()).map((res:Response) => res.json());
    }

    getAllergiesFromTrucare(member:Member) {
        return this._http.get(this.url + "/members/" + member.id +"/allergies", this.addHeaders()).map((res:Response) => res.json());
    }

    searchMemberDiagnoses(member:Member, diagnosisSearchCriteria:DiagnosisSearchCriteria) {
        return this._http.post(this.url +"/members/" + member.id +"/diagnoses-search", JSON.stringify(diagnosisSearchCriteria), {headers:this.addHeaders()})
            .map((res:Response) => res.json());
    }

    searchDiagnosisCodes(diagnosisCodeCode:string, diagnosisCodeName:string){
        return this._http.get(this.url +"/diagnosis-codes?code=" + diagnosisCodeCode + "&name=" + diagnosisCodeName, this.addHeaders()).map((res:Response)=>res.json());
    }

    searchMembers(memberSearchCriteria:MemberSearchCriteria){
        return this._http.post(this.url + "/members-search", JSON.stringify(memberSearchCriteria), {headers:this.addHeaders()}).map((res:Response) => res.json());
    }


    addMember(memberId:string){
        return this._http.put(this.url + "/member-list/" + memberId, "", {headers:this.addHeaders()}).map((res:Response) => res.json());
    }

    deleteMember(memberId:string){
        return this._http.delete(this.url + "/member-list/" + memberId, {headers:this.addHeaders()}).map((res:Response) => res.json());
    }

    getAllergyConfiguration(){
        return this._http.get(this.url + "/allergy-configuration/", this.addHeaders()).map((res:Response) => res.json());
    }

    addAllergy(member:Member, createAllergyRequest:CreateAllergyRequest){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        //headers.append("Accept", "application/json");
        return this._http.post(this.url + "/members/" + member.id +"/allergies", JSON.stringify(createAllergyRequest), {headers:headers}).map((res:Response) => res.json());
    }

    addDiagnosis(member:Member, createDiagnosisRequest:CreateDiagnosisRequest){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        //headers.append("Accept", "application/json");
        return this._http.post(this.url + "/members/" + member.id +"/diagnoses", JSON.stringify(createDiagnosisRequest), {headers:headers}).map((res:Response) => res.json());
    }
}
