import {MEMBERS} from '../data/members-list';
import {Injectable} from 'angular2/core';
import {Member} from "../model/member";
import {ALLERGIES} from "../data/allergies-list";
import {DIAGNOSES} from "../data/diagnoses-list";
import {ALLERGIES_RICHARD} from "../data/allergies-list";
import {ALLERGIES_DESMOND} from "../data/allergies-list";
import {DIAGNOSES_RICHARD} from "../data/diagnoses-list";
import {DIAGNOSES_DESMOND} from "../data/diagnoses-list";
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';
import {Headers} from "angular2/http";

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

    // Uses http.get() to load from a public API
    getPosts() {
        return this._http.get('http://jsonplaceholder.typicode.com/posts').map((res:Response) => res.json());
    }

    // Uses http.get() to load members from the secure TC API
    getMembersFromTrucare() {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        return this._http.get(this.url + "/member-list", headers).map((res:Response) => res.json());
    }

    getAllergiesFromTrucare(member:Member) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        return this._http.get(this.url + "/members/" + member.id +"/allergies", headers).map((res:Response) => res.json());
    }

    getDiagnosesFromTrucare(member:Member) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        var searchCriteria={"startIndex": 0,
            "length": 10,
            "gotoLastPage": false,
            "primaryOnly": false,
            "includeOpen": true,
            "includeClosed": false,
            "includeVoided": false,
            "reverseChronologicalOrder": false
    };
        return this._http.post(this.url +"/members/" + member.id +"/diagnoses-search", JSON.stringify(searchCriteria), {headers:headers})
            .map((res:Response) => res.json());
    }

    searchMembers(searchtext:string){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        var searchCriteria={
            "startIndex": 0,
            "length": 10,
            "gotoLastPage": false,
            "lastName": ""+searchtext+"",
            "firstName": ""
        };
        return this._http.post(this.url + "/members-search", JSON.stringify(searchCriteria), {headers:headers}).map((res:Response) => res.json());
    }


    addMember(memberId:string){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        return this._http.put(this.url + "/member-list/" + memberId, "", {headers:headers}).map((res:Response) => res.json());
    }


}
