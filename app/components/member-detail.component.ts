import {Component} from 'angular2/core';
import {Member} from '../model/member';


@Component({
    selector: 'member-detail',
    templateUrl:'app/components/templates/member-detail.component.html',
    inputs: ['member']
})
export class MemberDetailComponent {
    public member: Member;
}
