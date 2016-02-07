import {Component, View, Input} from 'angular2/core';
import {Sorter} from './Sorter';
import {Column} from "./Column";
import {OnInit} from "angular2/core";

@Component({
    selector: 'grid',
    //inputs: ['rows: rows','columns: columns'],
    template:
        `
        <table class="table table-striped">
            <tr>
                <td *ngFor="#col of columns"><a (click)="sort(col.name)">{{col.descr}}</a></td>
            </tr>
            <tr *ngFor="#row of rows">
                <td *ngFor="#col of columns">{{row[col.name]}}</td>
            </tr>
        </table>
        `
})

export class Grid implements OnInit{

    @Input()
    title:String;

    @Input()
    columns:Array<Column>;

    @Input()
    rows:Array<any>;

    sorter = new Sorter();

    constructor(){
        console.log("Grid Constructor rows=" + JSON.stringify(this.rows))
    }

    sort(key){
        this.sorter.sort(key, this.rows);
    }

    ngOnInit(){
        console.log("Grid onInit rows=" + JSON.stringify(this.rows))
    }
}
