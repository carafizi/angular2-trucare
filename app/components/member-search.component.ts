import {Component, Input} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {ControlGroup} from "angular2/common";
import {Control} from "angular2/common";
import {MemberService} from "../services/member.service";
import {Member} from "../model/member";
import {MemberSearchResult} from "../model/member-search-result";
import {OnInit} from "angular2/core";


@Component({
    selector: 'member-search',
    template:
        `
        <div class="panel panel-default">
            <div class="panel-body">
               <input class="form-control" placeholder="enter member name.." [(ngModel)]="searchCriteria" (keyup)="searchMembers()" />
            </div>
        </div>

        <div class="list-group">
                <a href="#" class="list-group-item" *ngFor="#member of memberResults" (click)="addMember(member.id)" style="background: cornsilk">{{member.firstName}} {{member.lastName}}</a>
        </div>
    `,
    providers: [MemberService]
})
export class MemberSearchComponent implements OnInit{
    public searchCriteria:string;
    public memberResults:MemberSearchResult[];
    @Input()
    public menumembers:Member[];

    constructor(private _memberService:MemberService) {}

    searchMembers() {
        console.log(this.searchCriteria);
        console.log("MenuMembers in searchMembers = "+ this.menumembers);
        if(this.searchCriteria && this.searchCriteria.length > 2) {
            this._memberService.searchMembers(this.searchCriteria).subscribe(res => {this.memberResults = res.searchResults});
        }
    }

    addMember(memberId:string){
        console.log("MenuMembers before ADD = "+ this.menumembers);
        this._memberService.addMember(memberId).subscribe(res => {
            this.menumembers=res.members;
            console.log("MenuMembers after ADD = "+ this.menumembers);
            this.memberResults = []
        });
    }

    ngOnInit() {
        console.log("MenuMembers in INIT = "+ this.menumembers);
    }
}
