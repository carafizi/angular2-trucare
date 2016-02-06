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
export class AllergyService {

    token:string;
    private appConfig = new AppConfig();

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
}