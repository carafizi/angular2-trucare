import { Component, Input, OnChanges, OnInit} from 'angular2/core';
import { Tab } from './Tab';
import {Member} from "../model/Member";
import {MemberDemographicsComponent} from "./MemberDemographicsComponent";
import {MemberMedicationsComponent} from "./MemberMedicationsComponent";
import {MemberAllergiesComponent} from "./MemberAllergiesComponent";
import {MemberDiagnosesComponent} from "./MemberDiagnosesComponent";

@Component({
    selector: 'tab-container',
    template: `
    <ul class="nav nav-tabs">
    <li *ngFor="#tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#{{tab.title}}">{{tab.title}} <span class="glyphicon glyphicon-remove" (click)="deleteTab(tab)"></span>
        </a>
    </li>
    </ul>

    <div class="panel-body" *ngIf="member">
        <div class="col-xs-4">
            <member-demographics [member]="member"></member-demographics>
        </div>
        <!--<div class="col-xs-4">-->
            <!--<member-medications [member]="member"></member-medications>-->
        <!--</div>-->
        <div class="col-xs-4">
            <member-allergies [member]="member"></member-allergies>
        </div>
        <!--<div class="col-xs-4">-->
            <!--<member-diagnoses [member]="member"></member-diagnoses>-->
        <!--</div>-->
    </div>
    <!--<ng-content></ng-content>-->
  `,
    inputs: ['tabc'],
    directives: [MemberDemographicsComponent, MemberMedicationsComponent, MemberAllergiesComponent, MemberDiagnosesComponent]

})
export class TabContainer implements OnChanges, OnInit{

    @Input()
    member:Member;

    tabs:Tab[];

    constructor() {
        this.tabs = [];
    }

    selectTab(tab) {
        //deactivate all tabs
        this.tabs.forEach((tab)=>tab.active = false);
        tab.active = true;
        this.member = tab.member;
    }

    addTab(member:Member) {

        if (!this.tabExists(member.firstName + " " + member.lastName)) {
            this.tabs.forEach((tab)=>tab.active = false);
            var tab = new Tab(member);
            tab.active = true;
            this.tabs.push(tab);
            this.member = member;
        }else{
            this.member=member;
            var t = this.getTabByMember(member);
            this.selectTab(t);
        }
    }

    tabExists(title:string):boolean {
        var tabExists;
        var elementPos = this.tabs.map(function (x) {return x.title;}).indexOf(title);
        console.log(elementPos);
        if (elementPos == -1) {
            tabExists = false;
        } else {
            tabExists = true;
        }
        return tabExists;
    }

    getTabByMember(member:Member):Tab{
        var result = this.tabs.filter(function( tab ) {
            return tab.member.id == member.id;
        });
        return result[0];
    }


    deleteTab(tab:Tab) {
        var index = this.tabs.indexOf(tab, 0);
        if (index != undefined) {
            this.tabs.splice(index, 1);
        }
    }

    ngOnChanges() {
        //console.log("Member in CONTAINER onchanges=" + this.member);
    }

    ngOnInit(){
        //console.log("Member in CONTAINER oninit=" + this.member);
    }
}
