import { Injectable } from '@angular/core';
 
@Injectable()
export class Configuration {
    public server: string = "http://localhost:3000";
    public apiUrl: string = "/api";
    public serverWithApiUrl = this.server + this.apiUrl;
}