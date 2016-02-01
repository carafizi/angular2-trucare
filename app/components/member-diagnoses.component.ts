import {Component, Input} from 'angular2/core';
import {Diagnosis} from "../model/diagnosis";
import {MemberService} from '../services/member.service';
import {OnChanges} from 'angular2/core';
import {Member} from "../model/member";
import {DiagnosisSearchResult} from "../model/diagnosis-search-result";


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
    providers: [MemberService]
})
export class MemberDiagnosesComponent implements OnChanges{
    @Input()
    public member: Member;

    public title = 'Diagnoses';
    public diagnoses:DiagnosisSearchResult[];

    constructor(private _memberService: MemberService) { }

    getDiagnosesMock(member:Member) {
        this._memberService.getMemberDiagnoses(member).then(diagnoses => this.diagnoses = diagnoses);
    }

    getMemberDiagnosis() {
        this._memberService.getDiagnosesFromTrucare(this.member).subscribe(res => {this.diagnoses = res.searchResults;});
    }

    ngOnChanges(){
        if(this.member) {
            this.getMemberDiagnosis();
        }
    }

}
