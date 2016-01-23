import {Component} from 'angular2/core';
import {Member} from './member';


@Component({
    selector: 'member-detail',
    template: `
              <div *ngIf="member">
                <h2>{{member.name}} details!</h2>
                <div><label>id: </label>{{member.id}}</div>
                <div>
                  <label>name: </label>
                  <input [(ngModel)]="member.name" placeholder="name"/>
                </div>
              </div>
            `,
    inputs: ['member']
})
export class MemberDetailComponent {
    public member: Member;
}
