import {Component, Input} from 'angular2/core';
import {Member} from '../model/Member';
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
import {MemberSearchResult} from "../model/MemberSearchResult";
import {MemberSearchCriteria} from "../model/MemberSearchCriteria";
import {MedicationService} from "../services/MedicationService";
import {ExtendedAttributesConfiguration} from "../model/ExtendedAttributesConfiguration";
import {MemberMedicationsComponent} from "./MemberMedicationsComponent";
import {Tab} from "./Tab";
import {TabContainer} from "./TabContainer";

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
                    <!--<div><member-search [menumembers]="members"></member-search></div>-->
                    <button class="btn btn-default" type="button" id="addaTab" (click)="tabc.addNewTab(selectedMember)">Add Tab</button>
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
                            <!--<a href="#" class="list-group-item" *ngFor="#member of members" [class.active]="member === selectedMember"  (click)="onSelect(member)">-->
                            <a href="#" class="list-group-item" *ngFor="#member of members" [class.active]="member === selectedMember"  (click)="tabc.addNewTab(member)">
                                   <span class="glyphicon glyphicon-remove" (click)="removeMember(member.id)"></span>
                                    {{member.firstName}} {{member.lastName}}
                            </a>
                         </div>
                    </div>
                </td>
                <td width="80%" valign="top">
                    <div class="container-fluid">
                        <div class="row" style="height: 60px">
                            <member-menu #tabm [tabm]="tabm"></member-menu>
                        </div>
                        <div class="row" style="height: 300px">

                        <tab-container #tabc [tabc]="tabc" [member]="selectedMember">
                            <!--<tab [member]="selectedMember">-->
                               <!--<div class="col-xs-4">-->
                                    <!--<member-demographics [member]="selectedMember"></member-demographics>-->
                                <!--</div>-->
                                <!--<div class="col-xs-4">-->
                                    <!--<member-medications  [member]="selectedMember"></member-medications>-->
                                <!--</div>-->
                                <!--&lt;!&ndash;<div class="col-xs-4">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<member-allergies [member]="selectedMember"></member-allergies>&ndash;&gt;-->
                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                <!--&lt;!&ndash;<div class="col-xs-4">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<member-diagnoses [member]="selectedMember"></member-diagnoses>&ndash;&gt;-->
                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--</tab>-->
                          </tab-container>

                        </div>
                    </div>
                </td>
            </tr>
        </table>
    `,
    styleUrls: ['app/components/css/app.component.css'],
    directives: [MemberDemographicsComponent, MemberAllergiesComponent, MemberDiagnosesComponent, MemberMenuComponent, TopMenuComponent, MemberMedicationsComponent, Tab, TabContainer],
    providers: [MemberService, MedicationService]
})
export class AppComponent implements OnInit, OnChanges {
    public title = 'List of Members';
    public selectedMember:Member;
    public members:Member[];
    public memberSearchCriteria:MemberSearchCriteria = new MemberSearchCriteria();
    public memberResults:MemberSearchResult[];
    @Input()
    public tabc:TabContainer;


    constructor(private _memberService:MemberService) {}

    onSelect(member:Member) {
        this.selectedMember = member;
        this.memberSearchCriteria.lastName="";
        console.log("TABC:" + this.tabc);
        if(this.tabc) {
            this.tabc.addNewTab(this.selectedMember);
        }
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


