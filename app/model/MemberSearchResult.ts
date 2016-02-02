import {OptionValue} from "./OptionValue.ts";
export interface MemberSearchResult {
    id: string;
    firstName: string;
    lastName:string;
    externalMemberId: string;
    dateOfBirth: string;
    gender:OptionValue;
}
