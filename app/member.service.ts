import {MEMBERS} from './mock-members';
import {Injectable} from 'angular2/core';
import {Member} from "./member";

@Injectable()
export class MemberService {
    getMembers() {
        return Promise.resolve(MEMBERS);
    }

    getMembersSlowly() {
        return new Promise<Member[]>(resolve =>setTimeout(()=>resolve(MEMBERS), 2000) // 2 seconds
        );
    }
}
