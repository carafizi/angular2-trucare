import {Component} from 'angular2/core';
import {Member} from '../model/member';
import {MemberDetailComponent} from './member-detail.component';
import {MemberService} from '../services/member.service';
import {OnInit} from 'angular2/core';
import {MemberAllergiesComponent} from "./member-allergies.component";
import {MemberDiagnosesComponent} from "./member-diagnoses.component";
import {TopMenuComponent} from "./top-menu.component";

@Component({
    selector: 'trucare-app',
    //templateUrl: 'app/components/templates/app.component.html' ,
    template:
        `
        <top-menu></top-menu>

        <div style="display: inline-block">
            <h2>List of members</h2>
            <ul class="members">
                <li *ngFor="#member of members" [class.selected]="member === selectedMember" (click)="onSelect(member)">
                    <span class="badge">{{member.externalMemberId}}</span> {{member.firstName}} {{member.lastName}}
                </li>
            </ul>
        </div>

        <div style="display: inline-block">
            <member-allergies [member]="selectedMember"></member-allergies>
        </div>


        <div style="display: inline-block">
            <member-diagnoses [member]="selectedMember"></member-diagnoses>
        </div>

        <!--<member-detail [member]="selectedMember"></member-detail>-->
        `,
    styleUrls:['app/components/css/app.component.css'],
    directives: [MemberDetailComponent, MemberAllergiesComponent, MemberDiagnosesComponent, TopMenuComponent],
    providers: [MemberService]
})
export class AppComponent implements OnInit{
    public title = 'List of Members';
    public selectedMember:Member;
    public members:Member[];

    constructor(private _memberService: MemberService) { }

    onSelect(member: Member) {
        this.selectedMember = member;
    }

    getMembers() {
        this._memberService.getMembers()
            .then(members => this.members = members);
    }

    ngOnInit() {
        this.getMembers();
    }

}


