import {MEMBERS} from '../data/members-list';
import {Injectable} from 'angular2/core';
import {Member} from "../model/member";
import {ALLERGIES} from "../data/allergies-list";
import {DIAGNOSES} from "../data/diagnoses-list";
import {ALLERGIES_RICHARD} from "../data/allergies-list";
import {ALLERGIES_DESMOND} from "../data/allergies-list";

@Injectable()
export class MemberService {
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

    getMemberDiagnoses() {
        return Promise.resolve(DIAGNOSES);

    }

    getMembersSlowly() {
        return new Promise<Member[]>(resolve =>setTimeout(()=>resolve(MEMBERS), 2000) // 2 seconds
        );
    }
}
