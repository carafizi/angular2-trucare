import {Component, Attribute, Input} from 'angular2/core';
import {Allergy} from '../model/allergy';
import {MemberService} from '../services/member.service';
import {OnInit, OnChanges} from 'angular2/core';
import {Member} from "../model/member";


@Component({
    selector: 'member-demographics',
    //templateUrl:'app/components/templates/member-allergies.component.html',
    template: `
        <div class="panel panel-primary">
          <div class="panel-heading">{{title}}</div>
          <div class="panel-body" *ngIf="member">
                <div><span class="text--cap">ID: </span>{{member.id}}</div>
                <div><span class="text--cap">External ID: </span>{{member.externalMemberId}}</div>
                <div><span class="text--cap">First name:</span> {{member.firstName}}</div>
                <div><span class="text--cap">Last name: </span>{{member.lastName}}</div>
                <div><span class="text--cap">Age: </span>{{member.age}}</div>
                <div><span class="text--cap">Gender: </span>{{member.gender.value}}</div>
                <div><span class="text--cap">Date of birth: </span>{{member.birthDate}}</div>
          </div>
        </div>
    `,
    inputs: ['member'],
    providers: [MemberService]
})
export class MemberDemographicsComponent implements OnChanges {
    public member:Member;
    public title = "Demographics";
    public allergies:Allergy[];

    constructor(private _memberService:MemberService) {
    }


    ngOnChanges(){
    }
}
