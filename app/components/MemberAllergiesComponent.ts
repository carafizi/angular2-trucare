import {Component, Attribute, Input} from 'angular2/core';
import {Allergy} from '../model/clinical/Allergy';
import {MemberService} from '../services/MemberService';
import {AllergyService} from '../services/AllergyService';
import {OnInit, OnChanges} from 'angular2/core';
import {Member} from "../model/member/Member";
import {AllergyConfiguration} from "../model/clinical/AllergyConfiguration";
import {OptionValue} from "../model/common/OptionValue";
import {CreateAllergyRequest} from "../model/clinical/CreateAllergyRequest";


@Component({
    selector: 'member-allergies',
    //templateUrl:'app/components/templates/member-allergies.component.html',
    template: `
<div class="panel panel-primary">
    <div class="panel-heading">{{title}}</div>
    <div class="panel-body" *ngIf="member">
        <ul>
            <li *ngFor="#allergy of allergies">
                <span class="text">{{allergy.allergy.label}}</span>-
                <span class="text">{{allergy.reaction.label}}</span>
            </li>
        </ul>
        <div [hidden]="!submitted">
            <button class="btn btn-default" type="button" id="addAllergyButton" (click)="showForm()">Add allergy
            </button>
        </div>

        <div [hidden]="submitted">
            <h1>Add allergy</h1>
            <form (ngSubmit)="onSubmit()" #allergyForm="ngForm">

                <div class="form-group">
                    <label for="allergy">Allergy</label>
                    <select class="form-control" required [(ngModel)]="createAllergyRequest.allergyOptionValueId"
                            ngControl="allergy" #allergy="ngForm">
                        <option *ngFor="#o of allergyConfiguration.allergyOptions" [value]="o.id">{{o.value}}</option>
                    </select>
                    <div [hidden]="allergy.valid" class="alert alert-danger">
                        Allergy is required
                    </div>
                </div>

                <div class="form-group">
                    <label for="reaction">Reaction</label>
                    <select class="form-control" required [(ngModel)]="createAllergyRequest.reactionOptionValueId"
                            ngControl="reaction" #reaction="ngForm">
                        <option *ngFor="#o of allergyConfiguration.reactionOptions" [value]="o.id">{{o.value}}</option>
                    </select>
                    <div [hidden]="reaction.valid" class="alert alert-danger">
                        Reaction is required
                    </div>
                </div>

                <div class="form-group">
                    <label for="severity">Severity</label>
                    <select class="form-control" required [(ngModel)]="createAllergyRequest.severityOptionValueId"
                            ngControl="severity" #severity="ngForm">
                        <option *ngFor="#o of allergyConfiguration.severityOptions" [value]="o.id">{{o.value}}</option>
                    </select>
                    <div [hidden]="severity.valid" class="alert alert-danger">
                        Severity is required
                    </div>
                </div>

                <div class="form-group">
                    <label for="source">Source</label>
                    <select class="form-control" [(ngModel)]="createAllergyRequest.sourceOptionValueId"
                            ngControl="source" #source="ngForm">
                        <option *ngFor="#o of allergyConfiguration.sourceOptions" [value]="o.id">{{o.value}}</option>
                    </select>
                </div>


                <div class="form-group">
                    <label for="details">Allergy Detail</label>
                    <input type="text" class="form-control" required [(ngModel)]="createAllergyRequest.allergyDetail"
                           ngControl="details" #details="ngForm">
                    <div [hidden]="details.valid" class="alert alert-danger">
                        Allergy details is required
                    </div>
                </div>


                <button type="submit" class="btn btn-default" [disabled]="!allergyForm.form.valid">Submit</button>
                <button class="btn btn-default" type="button" id="addAllergyButtonCancel" (click)="showForm()">Cancel
                </button>
            </form>
        </div>
    </div>
</div>
`,
    providers: [MemberService, AllergyService]
})
export class MemberAllergiesComponent implements OnChanges, OnInit {
    @Input()
    public member:Member;

    public title = 'Allergies';
    public allergies:Allergy[];
    private allergyConfiguration:AllergyConfiguration;
    public createAllergyRequest:CreateAllergyRequest = new CreateAllergyRequest();
    public submitted=true;


    constructor(private _memberService:MemberService, private _allergyService:AllergyService) {
    }


    getMemberAllergies() {
        this._allergyService.getAllergies(this.member).subscribe(res => {this.allergies = res});
    }

    getAllergyConfiguration(){
        this._allergyService.getAllergyConfiguration().subscribe(res=> this.allergyConfiguration = res)
    }

    onSubmit(){
        this._allergyService.addAllergy(this.member, this.createAllergyRequest).subscribe(res=> {
            this.submitted=true;
            this.getMemberAllergies();
            this.cleanForm()
        });

    }

    ngOnChanges(){
        if(this.member) {
            this.getMemberAllergies();
        }
    }

    showForm() {
        this.submitted = !this.submitted;
    }

    cleanForm(){
        this.createAllergyRequest.allergyDetail ="";
        this.createAllergyRequest.allergyOptionValueId ="";
        this.createAllergyRequest.reactionOptionValueId = "";
        this.createAllergyRequest.severityOptionValueId = "";
    }

    ngOnInit(){
        this.getAllergyConfiguration();
    }
}
