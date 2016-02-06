import { Component, Input } from 'angular2/core';
import {TabContainer} from './TabContainer';
import {Member} from "../model/Member";
import {OnChanges} from "angular2/core";
import {OnInit} from "angular2/core";
import {MemberDemographicsComponent} from "./MemberDemographicsComponent";
import {MemberMedicationsComponent} from "./MemberMedicationsComponent";

@Component({
    selector: 'tab',
    inputs: [
        'title:tabTitle',
        'active'
    ],
    template: `
    aaa
        <div [hidden]="!active" class="pane">
         <div class="panel-body" *ngIf="member">
            <!--<ng-content></ng-content>-->
            <div class="col-xs-4">
                <member-demographics [member]="member"></member-demographics>
            </div>
            <div class="col-xs-4">
                <member-medications [member]="member"></member-medications>
            </div>
         </div>
        </div>
        <ng-content></ng-content>
  `,
    directives: [MemberDemographicsComponent, MemberMedicationsComponent]
})
export class Tab implements OnChanges, OnInit {
    @Input()
    public member:Member;
    title:string = this.member ? this.member.firstName + " " + this.member.lastName : "default name";
    active = this.active || false;

    constructor(tabContainer:TabContainer) {
        tabContainer.addTab(this);
        console.log("Member in TAB=" + this.member);
    }

    ngOnChanges() {
        console.log("Member in TAB=" + this.member);
    }

    ngOnInit(){
        console.log("Member in TAB=" + this.member);
    }
}