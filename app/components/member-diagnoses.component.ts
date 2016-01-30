import {Component} from 'angular2/core';
import {Diagnosis} from "../model/diagnosis";
import {MemberService} from '../services/member.service';
import {OnChanges} from 'angular2/core';
import {Member} from "../model/member";


@Component({
    selector: 'member-diagnoses',
    //templateUrl:'app/components/templates/member-diagnoses.component.html',
    template: `
    <div class="panel panel-primary">
          <div class="panel-heading">{{title}}</div>
          <div class="panel-body" *ngIf="member">
                <ul>
                    <li *ngFor="#diagnosis of diagnoses">
                        <span class="text--cap">{{diagnosis.diagnosisCode.diagnosisCode}}</span>
                        <span class="text">{{diagnosis.diagnosisCode.diagnosisName}}</span>
                    </li>
                </ul>
            </div>
    </div>
    `,
    inputs: ['member'],
    providers: [MemberService]
})
export class MemberDiagnosesComponent implements OnChanges{
    public member: Member;
    public title = 'Diagnoses';
    public diagnoses:Diagnosis[];

    constructor(private _memberService: MemberService) { }

    getDiagnoses(member:Member) {
        this._memberService.getMemberDiagnoses(member)
            .then(diagnoses => this.diagnoses = diagnoses);
    }

    ngOnChanges(){
        if(this.member) {
            this.getDiagnoses(this.member);
        }
    }

}
