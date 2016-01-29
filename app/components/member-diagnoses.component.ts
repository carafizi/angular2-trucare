import {Component} from 'angular2/core';
import {Diagnosis} from "../model/diagnosis";
import {MemberService} from '../services/member.service';
import {OnInit} from 'angular2/core';
import {Member} from "../model/member";


@Component({
    selector: 'member-diagnoses',
    templateUrl:'app/components/templates/member-diagnoses.component.html',
    inputs: ['member'],
    providers: [MemberService]
})
export class MemberDiagnosesComponent implements OnInit{
    public member: Member;
    public title = 'List of Members';
    public diagnoses:Diagnosis[];

    constructor(private _memberService: MemberService) { }

    getDiagnoses() {
        this._memberService.getMemberDiagnoses()
            .then(diagnoses => this.diagnoses = diagnoses);
    }

    ngOnInit() {
        this.getDiagnoses();
    }

}
