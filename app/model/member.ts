import {OptionValue} from "./option.value";
export interface Member {
    id: string;
    firstName: string;
    lastName:string;
    externalMemberId: string;
    birthDate: string;
    gender:OptionValue;
    age:string;
    displayName:string;
}
