import {Headers} from "angular2/http";
export class AppConfig{
    url:string;
    longUrl:string;
    headers:Headers = new Headers();
    constructor(){
        this.url="/trucare-api/6.2/api";
        this.longUrl = "http://localhost:8082/trucare-api/6.2/api";
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
    }
}