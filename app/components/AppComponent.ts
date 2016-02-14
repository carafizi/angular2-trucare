import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {MemberDetailComponent} from './MemberDetailComponent';
import {MemberService} from '../services/MemberService';
import {OnInit, OnChanges} from 'angular2/core';
import {MemberAllergiesComponent} from "./MemberAllergiesComponent";
import {MemberDiagnosesComponent} from "./MemberDiagnosesComponent";
import {TopMenuComponent} from "./TopMenuComponent";
import {MemberDemographicsComponent} from "./MemberDemographicsComponent";
import {MemberMenuComponent} from "./MemberMenuComponent";
import {Headers} from "angular2/http";
import {ElementRef} from "angular2/core";
import {MemberSearchResult} from "../model/member/MemberSearchResult";
import {MemberSearchCriteria} from "../model/member/MemberSearchCriteria";
import {MedicationService} from "../services/MedicationService";
import {ExtendedAttributesConfiguration} from "../model/common/ExtendedAttributesConfiguration";
import {MemberMedicationsComponent} from "./MemberMedicationsComponent";
import {MedicationsSummaryComponent} from "./MedicationsSummaryComponent";
import {Member} from "../model/member/Member";
import {MemberDashboardComponent} from "./MemberDashboardComponent";
import {Router} from "angular2/router";

@Component({
    selector: 'trucare-app',
    //templateUrl: 'app/components/templates/app.component.html',
    template:
    `
        <table>
            <tr>
                <td></td>
                <td align="right">
                    <top-menu></top-menu>
                </td>
            </tr>
            <tr>
                <td valign="top" width="15%" style="padding-right: 10px">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <input class="form-control" placeholder="enter member name.." [(ngModel)]="memberSearchCriteria.lastName"
                                   (keyup)="searchMembers()"/>
                        </div>
                    </div>

                    <div class="list-group">
                        <a href="#" class="list-group-item" *ngFor="#member of memberResults" (click)="addMember(member.id)"
                           style="background: cornsilk">{{member.firstName}} {{member.lastName}}</a>
                    </div>

                    <div class="list-group">
                        <div class="pre-scrollable">
                            <a href="#" class="list-group-item" *ngFor="#member of members" [class.active]="member === selectedMember" (click)="onSelect(member)">
                                   <span class="glyphicon glyphicon-remove" (click)="removeMember(member.id)"></span>
                                    {{member.firstName}} {{member.lastName}}
                            </a>
                         </div>
                    </div>
                </td>
                <td width="80%" valign="top">
                    <div class="container-fluid">
                        <div class="row" style="height: 60px">
                            <member-menu [member]="selectedMember"></member-menu>
                        </div>
                        <div class="row" style="height: 300px">



                          <router-outlet></router-outlet>



                        </div>
                    </div>
                </td>
            </tr>
        </table>
    `,
    styleUrls: ['app/components/css/app.component.css'],
    directives: [TopMenuComponent, MemberMenuComponent, ROUTER_DIRECTIVES],
    providers: [MemberService]
})
@RouteConfig([
    {path:'/trucare-api/ng2/demographics',  name: 'MemberDashboard', component: MemberDashboardComponent},
    {path:'/trucare-api/ng2/medications-summary/',   name: 'MedicationsSummary', component: MedicationsSummaryComponent}
])
export class AppComponent implements OnInit, OnChanges {
    public title = 'List of Members';
    public selectedMember:Member;
    public members:Member[];
    public memberSearchCriteria:MemberSearchCriteria = new MemberSearchCriteria();
    public memberResults:MemberSearchResult[];


    constructor(private _memberService:MemberService, private _router: Router) {}

    onSelect(member:Member) {
        this.selectedMember = member;
        this.memberSearchCriteria.lastName="";
        this._router.navigate( ['MemberDashboard', { memberid: member.id }] );
    }

    getMembers() {
        this._memberService.getMembers().subscribe(res => {this.members = res.members});
    }

    removeMember(memberId:string){
        this._memberService.deleteMember(memberId).subscribe(res => {this.members = res.members});
    }

    searchMembers() {
        if(this.memberSearchCriteria.lastName && this.memberSearchCriteria.lastName.length > 2) {
            this._memberService.searchMembers(this.memberSearchCriteria).subscribe(res => {
                    this.memberResults = res.searchResults;
                }
            )}
    }

    addMember(memberId:string){
        this._memberService.addMember(memberId).subscribe(res => {
            this.members=res.members;
            this.memberResults = []
        });
    }

    ngOnInit() {
        this.getMembers();
    }

    ngOnChanges(){
        console.log("something changed");
    }

}


