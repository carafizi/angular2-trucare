import { Component, Input} from 'angular2/core';
import { Tab } from './Tab';
import {Member} from "../model/Member";

@Component({
    selector: 'tab-container',
    template: `
    <ul class="nav nav-tabs">
      <li *ngFor="#tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#">{{tab.title}} <span class="glyphicon glyphicon-remove" (click)="deleteTab(tab)"></span> </a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
    inputs: ['tabc']

})
export class TabContainer {

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
    }

    addTab(member:Member) {
        console.log("Param:" + member);
        if (this.tabExists(member.firstName + " " + member.lastName)) {
            var tab = new Tab(member);
            tab.active = true;
            this.tabs.push(tab);
        }
    }

    tabExists(title:string):boolean {
        var tabExists = false;
        var elementPos = this.tabs.map(function (x) {
            return x.title;
        }).indexOf(title);
        console.log(elementPos);
        if (elementPos == -1) {
            tabExists = true;
        }
        return tabExists;
    }


    deleteTab(tab:Tab) {
        var index = this.tabs.indexOf(tab, 0);
        if (index != undefined) {
            this.tabs.splice(index, 1);
        }
    }
}
