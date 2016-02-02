import {Component, Input} from 'angular2/core';
import {Diagnosis} from "../model/diagnosis";
import {MemberService} from '../services/member.service';
import {OnChanges} from 'angular2/core';
import {Member} from "../model/member";
import {DiagnosisSearchResult} from "../model/diagnosis-search-result";
import {CreateDiagnosisRequest} from "../model/create-diagnosis-request";
import {DiagnosisCodeSearchResult} from "../model/diagnosis-code-search-results";


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

                <div [hidden]="!submitted">
                    <button class="btn btn-default" type="button" id="addDiagnosisForm" (click)="showForm()">Add diagnosis
                    </button>
                </div>

                <div [hidden]="submitted">
                    <h1>Add Diagnosis</h1>
                    <form (ngSubmit)="addDiagnosis()" #diagnosisForm="ngForm">

                    <div class="list-group">
                         <input class="form-control" placeholder="enter dignosis.." [(ngModel)]="selectedCode.diagnosisName" (keyup)="searchDiagnosesCodes()"/>
                    </div>
                    <div class="list-group">
                        <a href="#" class="list-group-item" *ngFor="#res of diagnosisCodeSearchResults"  (click)="selectCode(res)"
                           style="background: cornsilk">{{res.diagnosisCode}} {{res.diagnosisName}}</a>
                    </div>

                        <div class="form-group">
                            <label for="reportedDate">Reported Date</label>
                            <input type="text" class="form-control" required [(ngModel)]="createDiagnosisRequest.reportedDate"
                                   ngControl="reportedDate" #reportedDate="ngForm">
                            <div [hidden]="reportedDate.valid" class="alert alert-danger">
                                Reported date is required
                            </div>
                        </div>


                        <button type="submit" class="btn btn-default" [disabled]="!diagnosisForm.form.valid">Submit</button>
                        <button class="btn btn-default" type="button" id="addDiagnosisForm" (click)="showForm()">Cancel</button>
                    </form>
                </div>
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
    public createDiagnosisRequest:CreateDiagnosisRequest = new CreateDiagnosisRequest();
    public submitted=true;

    public selectedCode:DiagnosisCodeSearchResult = new DiagnosisCodeSearchResult();

    public diagnosisCodeSearchResults:DiagnosisCodeSearchResult[];

    constructor(private _memberService: MemberService) { }

    getDiagnosesMock(member:Member) {
        this._memberService.getMemberDiagnoses(member).then(diagnoses => this.diagnoses = diagnoses);
    }

    getMemberDiagnosis() {
        this._memberService.searchMemberDiagnoses(this.member).subscribe(res => {this.diagnoses = res.searchResults;});
    }

    addDiagnosis(){
        this._memberService.addDiagnosis(this.member, this.createDiagnosisRequest).subscribe(res=>{

        });
        this.submitted=true;
        this.getMemberDiagnosis();
    }

    searchDiagnosesCodes(){
        this._memberService.searchDiagnosisCodes(this.selectedCode.diagnosisName).subscribe(res=>{
            this.diagnosisCodeSearchResults = res;
        })
    }

    showForm() {
        this.submitted = !this.submitted;
    }

    selectCode(code:DiagnosisCodeSearchResult){
        this.selectedCode = code;
        this.createDiagnosisRequest.diagnosisCodeId = code.id;
        this.diagnosisCodeSearchResults=[];
    }

    ngOnChanges(){
        if(this.member) {
            this.getMemberDiagnosis();
        }
    }

}
