import {Component, Attribute, Input} from 'angular2/core';
import {Allergy} from '../model/clinical/Allergy';
import {MemberService} from '../services/MemberService';
import {OnInit, OnChanges} from 'angular2/core';
import {Member} from "../model/member/Member";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {Output} from "angular2/core";
import {MemberDemographicsComponent} from "./MemberDemographicsComponent";
import {MemberAllergiesComponent} from "./MemberAllergiesComponent";
import {MemberDiagnosesComponent} from "./MemberDiagnosesComponent";
import {MemberMedicationsComponent} from "./MemberMedicationsComponent";


@Component({
    selector: 'member-dashboard',
    //templateUrl:'app/components/templates/member-allergies.component.html',
    template: `

    <div class="panel panel-primary" style="width: 100%">
      <div class="panel-heading">{{title}}</div>
      <div class="panel-body" *ngIf="member">
        <table style="width: 1500px">
            <tr >
                <div class="col-xs-4">
                    <member-demographics [member]="selectedMember"></member-demographics>
                </div>
                <div class="col-xs-4">
                    <member-allergies [member]="selectedMember"></member-allergies>
                </div>
                <div class="col-xs-4">
                    <member-diagnoses [member]="selectedMember"></member-diagnoses>
                </div>
            </tr>
            <tr>
                <div class="col-xs-4">
                    <member-medications  [member]="selectedMember"></member-medications>
                </div>
            </tr>
         </table>
     </div>
     </div>
    `,
    directives:[MemberDemographicsComponent, MemberAllergiesComponent, MemberDiagnosesComponent, MemberMedicationsComponent]
})
export class MemberDashboardComponent implements OnChanges, OnInit {


    @Input()
    public member:Member= new Member();

    public selectedMember:Member= new Member();

    @Input()
    public memberid:string;

    public title = "Member Dashboard";

    constructor(private _router:Router, private _routeParams:RouteParams) {
        this.memberid = _routeParams.get('memberid');
        this.selectedMember.id = this.memberid;
    }


    ngOnChanges(){
        this.selectedMember.id = this.memberid;
    }

    ngOnInit(){
        this.selectedMember.id = this.memberid;
    }
}
