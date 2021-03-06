import {Component, Input} from 'angular2/core';
import {Diagnosis} from "../model/clinical/Diagnosis";
import {MemberService} from '../services/MemberService';
import {OnChanges} from 'angular2/core';
import {Member} from "../model/member/Member";
import {DiagnosisSearchResult} from "../model/clinical/DiagnosisSearchResult";
import {CreateDiagnosisRequest} from "../model/clinical/CreateDiagnosisRequest";
import {DiagnosisCodeSearchResult} from "../model/clinical/DiagnosisCodeSearchResults";
import {DiagnosisSearchCriteria} from "../model/clinical/DiagnosisSearchCriteria";
import {DiagnosisService} from "../services/DiagnosisService";
import {MedicationSearchCriteria} from "../model/clinical/MedicationSearchCriteria";
import {MedicationSearchResult} from "../model/clinical/MedicationSearchResult";
import {MedicationService} from "../services/MedicationService";
import {CreateMedicationRequest} from "../model/clinical/CreateMedicationRequest";
import {SimpleDrug} from "../model/common/SimpleDrug";
import {Drug} from "../model/common/Drug";
import {ExtendedAttributesConfiguration} from "../model/common/ExtendedAttributesConfiguration";
import {OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";


@Component({
    selector: 'member-medications',
    //templateUrl:'app/components/templates/member-diagnoses.component.html',
    template: `
        <div class="panel panel-primary">
            <div class="panel-heading">{{title}}</div>
            <div class="panel-body" *ngIf="member">

                <ul>
                    <li *ngFor="#med of medications">
                        <span class="text" *ngIf="med.drug">{{med.drug.name}}</span>
                    </li>
                </ul>

                <div [hidden]="!submitted">
                    <button class="btn btn-default" type="button" id="addMedicationForm" (click)="showForm()">Add Medication
                    </button>
                </div>

                <div [hidden]="submitted">
                    <h1>Add Medication</h1>
                    <form (ngSubmit)="addMedication()" #medicationForm="ngForm" *ngIf="medicationConfiguration">

                        <div class="list-group">

                            <div style="display: inline-block"><input class="form-control" placeholder="drug name.."
                                                                      [(ngModel)]="selectedDrug.name"
                                                                      (keyup)="searchDrugs()"/></div>
                        </div>
                        <div class="list-group">
                            <a href="#" class="list-group-item" *ngFor="#drug of drugsSearchResults"
                               (click)="selectDrug(drug)"
                               style="background: cornsilk">{{drug.id}} {{drug.description}}</a>
                        </div>

                        <div class="form-group">
                            <label for="frequency">Frequency</label>
                            <select class="form-control" required [(ngModel)]="createMedicationRequest.frequencyOption" ngControl="frequency" #frequency="ngForm">
                                <option *ngFor="#o of medicationConfiguration.optionFieldMap.frequencyOption.optionValues" [value]="o.value">{{o.label}}</option>
                            </select>
                            <div [hidden]="frequency.valid" class="alert alert-danger">
                                Frequency is required
                            </div>
                        </div>

                        <!--<div class="form-group">-->
                            <!--<label for="reportedDate">Reported Date</label>-->
                            <!--<input type="text" class="form-control" required [(ngModel)]="createDiagnosisRequest.reportedDate"-->
                                   <!--ngControl="reportedDate" #reportedDate="ngForm">-->
                            <!--<div [hidden]="reportedDate.valid" class="alert alert-danger">-->
                                <!--Reported date is required-->
                            <!--</div>-->
                        <!--</div>-->

                        <!--<div class="form-group">-->
                            <!--<label for="reportedBy">Reported By</label>-->
                            <!--<input type="text" class="form-control" required [(ngModel)]="createDiagnosisRequest.reportedBy"-->
                                   <!--ngControl="reportedBy" #reportedBy="ngForm">-->
                            <!--<div [hidden]="reportedBy.valid" class="alert alert-danger">-->
                                <!--Reported date is required-->
                            <!--</div>-->
                        <!--</div>-->


                        <button type="submit" class="btn btn-default" [disabled]="!medicationForm.form.valid">Submit</button>
                        <button class="btn btn-default" type="button" id="addMedicationForm" (click)="cancelForm()">Cancel</button>
                    </form>
                    <p></p>
                    <div class="list-group">
                        <div class="alert alert-danger" *ngIf="errorMsg" >{{errorMsg}}</div>
                    </div>

                </div>
            </div>
        </div>
        `,
    providers: [MemberService, MedicationService]
})
export class MemberMedicationsComponent implements OnChanges, OnInit {
    @Input()
    public member:Member;

    public title = 'Medications';
    public medications:MedicationSearchResult[];
    public createMedicationRequest:CreateMedicationRequest = new CreateMedicationRequest();
    public submitted = true;
    public drugsSearchResults:SimpleDrug[];

    public selectedDrug:Drug = new Drug();

    public medicationSearchResults:MedicationSearchResult[];
    public medicationSearchCriteria = new MedicationSearchCriteria();

    public medicationConfiguration:ExtendedAttributesConfiguration;

    public errorMsg;


    constructor(private _memberService:MemberService, private _medicationService:MedicationService, _routeParams:RouteParams) {
        this.member = new Member();
        this.member.id =  _routeParams.get('memberid');
    }

    getMemberMedications() {
        this._medicationService.searchMemberMedications(this.member, this.medicationSearchCriteria).subscribe(res => {
            this.medications = res.searchResults;
        });
    }

    getMemberConfiguration() {
        this._medicationService.getMedicationConfiguration().subscribe(res => {
            this.medicationConfiguration = res
        });
    }

    addMedication() {
        this._medicationService.addMedication(this.member, this.createMedicationRequest).subscribe(
            res=> {
                this.submitted = true;
                this.getMemberMedications();
                this.cleanForm();
            },
            err=>{
                console.log(err);
                var err_json = JSON.parse(err.text());
                this.errorMsg = err_json.details;
                console.log("ERROR=" + this.errorMsg);
            }
        );

    }

    searchDrugs() {
        this._medicationService.searchDrugs(this.selectedDrug.name).subscribe(res=> {
            this.drugsSearchResults = res
        })
    }

    showForm() {
        this.submitted = !this.submitted;
    }

    selectDrug(drugSearchResult:SimpleDrug) {
        this.selectedDrug.id = drugSearchResult.id;
        this.selectedDrug.name = drugSearchResult.description;
        this.createMedicationRequest.drugId = drugSearchResult.id;
        this.drugsSearchResults = [];
    }

    cancelForm() {
        this.submitted = true;
        this.cleanForm();

    }

    cleanForm(){
        this.selectedDrug.name = "";
        this.selectedDrug.id = "";
        this.selectedDrug.description = "";
        this.createMedicationRequest.drugId="";
        this.errorMsg="";
    }

    ngOnInit() {
        this.getMemberConfiguration();
    }

    ngOnChanges() {
        if (this.member) {
            this.getMemberMedications();
        }
    }

}
