import {OptionValue} from "./option.value";
export interface MemberSearchResult {
    id: string;
    firstName: string;
    lastName:string;
    externalMemberId: string;
    dateOfBirth: string;
    gender:OptionValue;
}
