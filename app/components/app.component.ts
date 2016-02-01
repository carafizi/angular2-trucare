import {Component} from 'angular2/core';
import {Member} from '../model/member';
import {MemberDetailComponent} from './member-detail.component';
import {MemberService} from '../services/member.service';
import {OnInit, OnChanges} from 'angular2/core';
import {MemberAllergiesComponent} from "./member-allergies.component";
import {MemberDiagnosesComponent} from "./member-diagnoses.component";
import {TopMenuComponent} from "./top-menu.component";
import {MemberDemographicsComponent} from "./member-demographics.component";
import {MemberMenuComponent} from "./member-menu.component";
import {MemberSearchComponent} from "./member-search.component";
import {Headers} from "angular2/http";
import {ElementRef} from "angular2/core";

@Component({
    selector: 'trucare-app',
    //templateUrl: 'app/components/templates/app.component.html',
    template:
    `
    <table>
    <tr>
        <td></td>
        <td align="right"><top-menu></top-menu></td>
    </tr>
    <tr>
        <td valign="top" width="15%" style="padding-right: 10px">
            <div class="list-group">
                <a href="#" class="list-group-item" *ngFor="#member of members" [class.active]="member === selectedMember" (click)="onSelect(member)">
                    {{member.firstName}}
                    {{member.lastName}}
                    <span class="glyphicon glyphicon-remove" (click)="removeMember(member.id)"></span>
                </a>
            </div>
        </td>
        <td width="80%" valign="top">
            <div class="container-fluid">
                <div class="row" style="height: 60px"><member-menu></member-menu></div>
                <div class="row" style="height: 300px">
                    <div class="col-xs-4"><member-demographics [member]="selectedMember"></member-demographics></div>
                    <div class="col-xs-4"><member-allergies [member]="selectedMember"></member-allergies></div>
                    <div class="col-xs-4"><member-diagnoses [member]="selectedMember"></member-diagnoses></div>
                </div>
            </div>

            <div><member-search [menumembers]="members"></member-search></div>
        </td>
    </tr>
</table>
    `,
    styleUrls: ['app/components/css/app.component.css'],
    directives: [MemberDemographicsComponent, MemberAllergiesComponent, MemberDiagnosesComponent, MemberMenuComponent, TopMenuComponent, MemberSearchComponent],
    providers: [MemberService]
})
export class AppComponent implements OnInit, OnChanges {
    public title = 'List of Members';
    public selectedMember:Member;
    public members:Member[];

    constructor(private _memberService:MemberService) {}

    onSelect(member:Member) {
        this.selectedMember = member;
    }

    getMembersMock() {
        this._memberService.getMembers()
            .then(members => this.members = members);
    }

    getMembers() {
        this._memberService.getMembersFromTrucare().subscribe(res => {this.members = res.members});
    }

    removeMember(memberId:string){
        this._memberService.deleteMember(memberId).subscribe(res => {this.members = res.members});
    }

    ngOnInit() {
        this.getMembers();
    }

    ngOnChanges(){
        console.log("something changed");
    }

}


