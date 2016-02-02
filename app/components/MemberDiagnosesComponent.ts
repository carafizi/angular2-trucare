import {Component, Input} from 'angular2/core';
import {Diagnosis} from "../model/Diagnosis";
import {MemberService} from '../services/MemberService';
import {OnChanges} from 'angular2/core';
import {Member} from "../model/Member";
import {DiagnosisSearchResult} from "../model/DiagnosisSearchResult";
import {CreateDiagnosisRequest} from "../model/CreateDiagnosisRequest";
import {DiagnosisCodeSearchResult} from "../model/DiagnosisCodeSearchResults";
import {DiagnosisSearchCriteria} from "../model/DiagnosisSearchCriteria";
import {DiagnosisService} from "../services/DiagnosisService";


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
                            <div style="display: inline-block; width: 20%"><input  class="form-control" placeholder="code.."
                                                                      [(ngModel)]="selectedCode.diagnosisCode"
                                                                      (keyup)="searchDiagnosesCodes()"/></div>
                            <div style="display: inline-block"><input class="form-control" placeholder="diagnosis name.."
                                                                      [(ngModel)]="selectedCode.diagnosisName"
                                                                      (keyup)="searchDiagnosesCodes()"/></div>
                        </div>
                        <div class="list-group">
                            <a href="#" class="list-group-item" *ngFor="#res of diagnosisCodeSearchResults"
                               (click)="selectCode(res)"
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

                        <div class="form-group">
                            <label for="reportedBy">Reported By</label>
                            <input type="text" class="form-control" required [(ngModel)]="createDiagnosisRequest.reportedBy"
                                   ngControl="reportedBy" #reportedBy="ngForm">
                            <div [hidden]="reportedBy.valid" class="alert alert-danger">
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
    providers: [MemberService, DiagnosisService]
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
    public diagnosisSearchCriteria = new DiagnosisSearchCriteria();

    private createdDiagnosisId;

    constructor(private _memberService: MemberService, private _diagnosisService:DiagnosisService) { }

    getMemberDiagnosis() {
        this._diagnosisService.searchMemberDiagnoses(this.member, this.diagnosisSearchCriteria).subscribe(res => {this.diagnoses = res.searchResults;});
    }

    addDiagnosis(){
        this._diagnosisService.addDiagnosis(this.member, this.createDiagnosisRequest).subscribe(res=> {
            this.submitted=true;
            this.getMemberDiagnosis();
            this.cleanForm();
        });

    }

    searchDiagnosesCodes(){
        this._diagnosisService.searchDiagnosisCodes(this.selectedCode.diagnosisCode, this.selectedCode.diagnosisName).subscribe(res=>{
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

    cleanForm(){
        this.selectedCode.diagnosisCode = "";
        this.selectedCode.diagnosisName="";
    }

    ngOnChanges(){
        if(this.member) {
            this.getMemberDiagnosis();
        }
    }

}
