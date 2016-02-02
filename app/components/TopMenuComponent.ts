import {Component} from 'angular2/core';


@Component({
    selector: 'top-menu',
    template:
    `
    <div class="dropdown">
        <button class="btn btn-default" type="button" id="menu1" >Member Search</button>
        <button class="btn btn-default" type="button" id="menu2" >Provider<span></span></button>
        <button class="btn btn-default" type="button" id="menu3" >Authorization Search</button>
        <button class="btn btn-default" type="button" id="menu4" >Resources</button>
        <button class="btn btn-default" type="button" id="menu5" >Reporting</button>
        <button class="btn btn-default" type="button" id="menu6" >Admin</button>
        <button class="btn btn-default" type="button" id="menu7" >Settings</button>
        <button class="btn btn-default" type="button" id="menu8" >Help</button>
        <button class="btn btn-default" type="button" id="menu9" >Logout</button>
    </div>
    `
})
export class TopMenuComponent {
}
