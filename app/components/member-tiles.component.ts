import {Component, Input} from 'angular2/core';
import {Member} from '../model/member';
import {MemberAllergiesComponent} from "./member-allergies.component";
import {MemberDiagnosesComponent} from "./member-diagnoses.component";


@Component({
    selector: 'member-tiles',
    templateUrl:'app/components/templates/member-tiles.component.html',
    directives:[MemberAllergiesComponent, MemberDiagnosesComponent],
    inputs:[]
})
export class MemberTilesComponent {
    @Input()
    public member: Member;
}