import {Component, Attribute, Input} from 'angular2/core';
import {Allergy} from '../model/allergy';
import {MemberService} from '../services/member.service';
import {OnInit, OnChanges} from 'angular2/core';
import {Member} from "../model/member";


@Component({
    selector: 'member-allergies',
    //templateUrl:'app/components/templates/member-allergies.component.html',
    template: `
       <div class="panel panel-primary">
          <div class="panel-heading">{{title}}</div>
          <div class="panel-body" *ngIf="member">
            <ul>
                <li *ngFor="#allergy of allergies">
                    <span class="text">{{allergy.allergy.label}}</span>-
                    <span class="text">{{allergy.reaction.label}}</span>
                </li>
            </ul>
          </div>
        </div>

    `,
    providers: [MemberService]
})
export class MemberAllergiesComponent implements OnChanges {
    @Input()
    public member:Member;

    public title = 'Allergies';
    public allergies:Allergy[];
    public posts;

    constructor(private _memberService:MemberService) {
    }

    getAllergiesMock(member:Member) {
        this._memberService.getMemberAllergies(this.member).then(res => this.allergies = res);
    }

    getMemberAllergies() {
        this._memberService.getAllergiesFromTrucare(this.member).subscribe(res => {this.allergies = res});
    }

    ngOnChanges(){
        if(this.member) {
            this.getMemberAllergies();
        }
    }
}
