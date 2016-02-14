import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {MemberDemographicsComponent} from "./MemberDemographicsComponent";
import {MedicationsSummaryComponent} from "./MedicationsSummaryComponent";
import {RouteConfig} from "angular2/router";
import {OnInit} from "angular2/core";
import {OnChanges} from "angular2/core";
import {Member} from "../model/member/Member";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {RouterOutlet} from "angular2/router";
import {Inject} from "angular2/core";


@Component({
    selector: 'member-menu',
    templateUrl:'app/components/templates/member-menu.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MemberMenuComponent implements OnInit, OnChanges{

    @Input()
    public member:Member;

    private _selectedId: number;

    constructor(private _router: Router){
        //this._selectedId = +routeParams.get('memberid');
    }

    ngOnInit() {
        if(this.member)
        console.log("MENU on init MEMBER:" + this.member.displayName)
    }

    ngOnChanges() {
        if(this.member)
        console.log("MENU on changes MEMBER"+ this.member.displayName)
    }

    onSelect(path:String){
        console.log("onselect path: "+ path);
        this._router.navigate( [path, { memberid: "sss" }] );
    }
}