import {Component, Attribute, Input} from 'angular2/core';
import {Allergy} from '../model/allergy';
import {MemberService} from '../services/member.service';
import {OnInit, OnChanges} from 'angular2/core';
import {Member} from "../model/member";


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
                <li *ngFor="#post of posts">
                    <span class="text">{{post.id}}</span>-
                    <span class="text">{{post.title}}</span>
                </li>

            </ul>
          </div>
        </div>

    `,
    inputs: ['member'],
    providers: [MemberService]
})
export class MemberAllergiesComponent implements OnChanges {
    public member:Member;
    public title = 'Allergies';
    public allergies:Allergy[];
    public posts;

    constructor(private _memberService:MemberService) {
    }


    getAllergies(member:Member) {
        this._memberService.getMemberAllergies(this.member)
            .then(allergies => this.allergies = allergies);
    }

    getPosts() {
        this._memberService.getPosts().subscribe(
            // the first argument is a function which runs on success
            data => { this.posts = data},
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading posts')
        );
    }

    ngOnChanges(){
        if(this.member) {
            this.getAllergies(this.member);
            this.getPosts();
        }
    }
}
