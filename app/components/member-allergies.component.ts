import {Component, Attribute, Input} from 'angular2/core';
import {Allergy} from '../model/allergy';
import {MemberService} from '../services/member.service';
import {OnInit, OnChanges} from 'angular2/core';
import {Member} from "../model/member";


@Component({
    selector: 'member-allergies',
    //templateUrl:'app/components/templates/member-allergies.component.html',
    template: `
       <h2>{{title}}</h2>
            <ul class="allergies">
                <li *ngFor="#allergy of allergies">
                    <span class="badge">{{allergy.allergy.id}}</span>
                    <span class="badge">{{allergy.allergy.label}}</span>
                </li>
            </ul>
    `,
    inputs: ['member'],
    providers: [MemberService]
})
export class MemberAllergiesComponent implements OnChanges {
    public member:Member;
    public title = 'List of Allergies';
    public allergies:Allergy[];

    constructor(private _memberService:MemberService) {
    }


    getAllergies(member:Member) {
        this._memberService.getMemberAllergies(this.member)
            .then(allergies => this.allergies = allergies);
    }

    ngOnChanges(){
        if(this.member) {
            this.getAllergies(this.member);
        }
    }
}
