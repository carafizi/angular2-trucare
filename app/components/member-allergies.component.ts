import {Component, Attribute, Input} from 'angular2/core';
import {Allergy} from '../model/allergy';
import {MemberService} from '../services/member.service';
import {OnInit, OnChanges} from 'angular2/core';
import {Member} from "../model/member";
import {AllergyConfiguration} from "../model/allergy-configuration";
import {OptionValue} from "../model/option.value";
import {CreateAllergyRequest} from "../model/create-allergy-request";


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
                <button class="btn btn-default" type="button" id="addAllergyButton" (click)="showForm()">Add allergy</button>
             </div>

            <div [hidden]="submitted">
                <h1>Add allergy</h1>
                <form (ngSubmit)="onSubmit()" #allergyForm="ngForm">

                 <div class="form-group">
                    <label for="allergy">Allergy</label>
                        <select class="form-control" required [(ngModel)]="createAllergyRequest.allergyOptionValueId" ngControl="allergy" #allergy="ngForm" >
                          <option *ngFor="#p of allergyConfiguration.allergyOptions" [value]="p.id">{{p.value}}</option>
                        </select>
                    <div [hidden]="allergy.valid" class="alert alert-danger">
                      Allergy is required
                    </div>
                  </div>

                 <div class="form-group">
                    <label for="reaction">Reaction</label>
                        <select class="form-control" required [(ngModel)]="createAllergyRequest.reactionOptionValueId" ngControl="reaction" #reaction="ngForm" >
                          <option *ngFor="#p of allergyConfiguration.reactionOptions" [value]="p.id">{{p.value}}</option>
                        </select>
                    <div [hidden]="reaction.valid" class="alert alert-danger">
                      Reaction is required
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="severity">Severity</label>
                        <select class="form-control" required [(ngModel)]="createAllergyRequest.severityOptionValueId" ngControl="severity" #severity="ngForm" >
                          <option *ngFor="#p of allergyConfiguration.severityOptions" [value]="p.id">{{p.value}}</option>
                        </select>
                    <div [hidden]="severity.valid" class="alert alert-danger">
                      Severity is required
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="source">Source</label>
                        <select class="form-control"  [(ngModel)]="createAllergyRequest.sourceOptionValueId" ngControl="source" #source="ngForm" >
                          <option *ngFor="#p of allergyConfiguration.sourceOptions" [value]="p.id">{{p.value}}</option>
                        </select>
                  </div>


                  <div class="form-group">
                    <label for="details">Allergy Detail</label>
                    <input type="text" class="form-control" required [(ngModel)]="createAllergyRequest.allergyDetail" ngControl="details"  #details="ngForm" >
                    <div [hidden]="details.valid" class="alert alert-danger">
                      Allergy details is required
                    </div>
                  </div>


                  <button type="submit" class="btn btn-default" [disabled]="!allergyForm.form.valid">Submit</button>
                  <button class="btn btn-default" type="button" id="addAllergyButtonCancel" (click)="showForm()">Cancel</button>
                </form>
             </div>
    `,
    providers: [MemberService]
})
export class MemberAllergiesComponent implements OnChanges, OnInit {
    @Input()
    public member:Member;

    public title = 'Allergies';
    public allergies:Allergy[];
    private allergyConfiguration:AllergyConfiguration;
    public createAllergyRequest:CreateAllergyRequest = new CreateAllergyRequest();
    public submitted=true;


    constructor(private _memberService:MemberService) {
    }

    getAllergiesMock(member:Member) {
        this._memberService.getMemberAllergies(this.member).then(res => this.allergies = res);
    }

    getMemberAllergies() {
        console.log("Fetching allergies");
        this._memberService.getAllergiesFromTrucare(this.member).subscribe(res => {this.allergies = res});
    }

    getAllergyConfiguration(){
        this._memberService.getAllergyConfiguration().subscribe(res=> this.allergyConfiguration = res)
    }

    onSubmit(){
        this._memberService.addAllergy(this.member, this.createAllergyRequest).subscribe(res=> {


        });


        this.submitted=true;
        console.log("Changed submitted" + this.submitted);
        console.log("Before updating allergies");
        this.getMemberAllergies();
        console.log("After updating allergies");
    }

    ngOnChanges(){
        if(this.member) {
            console.log("in OnChange");
            this.getMemberAllergies();
        }
    }

    showForm() {
        this.submitted = !this.submitted;
    }

    ngOnInit(){
        this.getAllergyConfiguration();
    }
}
