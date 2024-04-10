import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InfoService {

    data !: any;

    constructor(private _httpClient : HttpClient) {
    
        this._httpClient.get('/assets/data/general_data.json').subscribe((data : any) => {
            this.data = data;   
        });

    }

    getData () 
    {
        return this.data;
    }

}
