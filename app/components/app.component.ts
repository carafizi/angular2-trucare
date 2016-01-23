import {Component} from 'angular2/core';
import {Member} from '../model/member';
import {MemberDetailComponent} from './member-detail.component';
import {MemberService} from '../services/member.service';
import {OnInit} from 'angular2/core';

@Component({
    selector: 'trucare-app',
    templateUrl: 'app/components/templates/app.component.html' ,
    styleUrls:['app/components/css/app.component.css'],
    directives: [MemberDetailComponent],
    providers: [MemberService]
})
export class AppComponent implements OnInit{
    public title = 'List of Members';
    public selectedMember:Member;
    public members:Member[];

    constructor(private _memberService: MemberService) { }

    onSelect(member: Member) { this.selectedMember = member; }

    getMembers() {
        this._memberService.getMembers()
            .then(members => this.members = members);
    }

    ngOnInit() {
        this.getMembers();
    }

}


