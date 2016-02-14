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


    constructor(private _router: Router){
    }

    navigateTo(path:string){
        this._router.navigate( [ path, { memberid: this.member.id }] );
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }

}