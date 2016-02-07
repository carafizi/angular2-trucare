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
import {Column} from "../Column";
import {Grid} from "../Grid";
import {Sorter} from '../Sorter';
import {Medication} from "../model/clinical/Medication";
import {MedicationSearchPipe} from "../pipes/MedicationSearchPipe";


@Component({
    selector: 'medications-summary',
    //templateUrl:'app/components/templates/member-diagnoses.component.html',
    template: `
        <div class="panel panel-primary" style="width: 100%">
            <div class="panel-heading">{{title}}</div>
            <div class="panel-body" *ngIf="member">

                <div class="panel-body">
                     <input class="form-control" placeholder="enter medication id.." [(ngModel)]="searchCriteria.name" (keyup)="filterMedications()"/>
                </div>

                <!--<grid [rows]="medications" [columns]="columns" [title]="title"></grid>-->


                <table class="table table-striped">
                    <tr>
                        <td *ngFor="#col of columns"><a (click)="sort(col.name)">{{col.descr}}</a></td>
                    </tr>
                    <tr *ngFor="#med of medicationsToDisplay"  (click)="getMemberMedicationByCodeId(med.drug.id)" [class.active]="med === selectedMedications">
                        <!--<td *ngFor="#col of columns">{{med[col.name]}}</td>-->
                        <td ><a hreg="#">{{med.id}}</a></td>
                        <td ><span *ngIf="med.drug">{{med.drug.name}}</span></td>
                        <td >{{med.dateAdded}}</td>
                        <td >{{med.active}}</td>
                        <td >{{med.voidInfoExists}}</td>
                    </tr>
                </table>

                <div>
                <h3>Medication regimens summary</h3>
                    <table class="table table-striped">
                    <tr>
                        <td ><a (click)="sort(col.name)">Medication</a></td>
                        <td ><a (click)="sort(col.name)">Dosage | Frequency | Root</a></td>
                    </tr>
                        <tr *ngFor="#smed of selectedMedications">
                           <td >{{smed.drug.description}}</td>
                           <td >{{smed.frequency.label}}</td>
                        </tr>
                    </table>
                </div>

                <div [hidden]="!submitted">
                    <button class="btn btn-default" type="button" id="addMedicationForm" (click)="showForm()">Add Medication
                    </button>
                </div>

                <div [hidden]="submitted">
                    <h1>Add Medication</h1>
                    <form (ngSubmit)="addMedication()" #medicationForm="ngForm">
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
    providers: [MemberService, MedicationService, Grid],
    directives: [Grid],
    pipes: [MedicationSearchPipe]
})
export class MedicationsSummaryComponent implements OnChanges, OnInit {
    @Input()
    public member:Member;

    public title = 'Medications Summary';
    public medications:MedicationSearchResult[] = [];
    public medicationsToDisplay:MedicationSearchResult[] = [];
    public createMedicationRequest:CreateMedicationRequest = new CreateMedicationRequest();
    public submitted = true;
    public drugsSearchResults:SimpleDrug[];

    public selectedDrug:Drug = new Drug();

    public medicationSearchResults:MedicationSearchResult[];
    public medicationSearchCriteria = new MedicationSearchCriteria();

    public medicationConfiguration:ExtendedAttributesConfiguration;

    public selectedMedications:Medication[];

    public errorMsg;
    columns:Array<Column>;

    sorter = new Sorter();

    public searchCriteria = {id: "", name: ""};


    constructor(private _memberService:MemberService, private _medicationService:MedicationService) {
        this.columns = this.getColumns();
        console.log("member in  on constructor=" + JSON.stringify(this.member))
    }

    getColumns():Array<Column> {
        return [
            new Column('id', 'id', 'ID'),
            new Column('name', 'drug.name', 'Medication'),
            new Column('dateAdded', 'dateAdded', 'Date added'),
            new Column('active', 'active', 'Status'),
            new Column('voidInfoExists', 'voidInfoExists', 'Voided')
        ];
    }

    filterMedications() {
        this.medicationsToDisplay = this.medications.filter(med => med.drug.name.toLowerCase().includes(this.searchCriteria.name.toLowerCase()));
    }

    getMemberMedicationByCodeId(codeId:string) {
        this._medicationService.getMemberMedicationByCodeId(this.member, codeId).subscribe(res=> this.selectedMedications = res);
    }

    getMemberMedications() {
        this._medicationService.searchMemberMedications(this.member, this.medicationSearchCriteria).subscribe(res => {
            this.medications = res.searchResults;
            this.medicationsToDisplay = res.searchResults;
        });
    }

    getMemberConfiguration() {
        this._medicationService.getMedicationConfiguration().subscribe(res => {
            this.medicationConfiguration = res
        });
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

    cleanForm() {
        this.selectedDrug.name = "";
        this.selectedDrug.id = "";
        this.selectedDrug.description = "";
        this.createMedicationRequest.drugId = "";
        this.errorMsg = "";
    }

    ngOnInit() {
        this.getMemberConfiguration();
        if (this.member) {
            this.getMemberMedications();
        }
        console.log("member in  on init=" + JSON.stringify(this.member))
    }

    ngOnChanges() {
        if (this.member) {
            this.getMemberMedications();

            console.log("member in  on onchanges=" + JSON.stringify(this.member));
            console.log("meds on changes=" + JSON.stringify(this.medications))


        }

    }

    sort(key) {
        console.log(key)
        this.sorter.sort(key, this.medicationsToDisplay);
    }
}
