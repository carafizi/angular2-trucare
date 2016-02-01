import {Component} from 'angular2/core';
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
        <div>
           <input class="swish-input" placeholder="Enter search word.." [(ngModel)]="searchCriteria" (keyup)="searchMembers()" />
        </div>

        <div class="list-group">
                <a href="#" class="list-group-item" *ngFor="#member of members" (click)="addMember(member.id)">{{member.firstName}}{{member.lastName}}</a>
        </div>
    `,
    providers: [MemberService]
})
export class MemberSearchComponent implements OnInit{
    public searchCriteria:string;
    private selectedMember:Member;
    public members:MemberSearchResult[];
    public myMembers:Member[];

    constructor(private _memberService:MemberService) {}

    searchMembers() {
        console.log(this.searchCriteria);
        if(this.searchCriteria && this.searchCriteria.length > 2) {
            this._memberService.searchMembers(this.searchCriteria).subscribe(res => {this.members = res.searchResults});
        }
    }

    addMember(memberId:string){
        this._memberService.addMember(memberId).subscribe(res => {this.myMembers = res.searchResults});
    }

    ngOnInit() {
        //this.searchMembers();
    }
}
