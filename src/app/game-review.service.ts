import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
// import { Game } from './game';
// import { Observable } from 'rxjs';

@Injectable()
export class GameReview {

  private _url: string = `http://localhost:3343/review/`
  private _proxy: string = 'https://cors-anywhere.herokuapp.com/';


  constructor(private http: HttpClient) {}

  
  reviewPost(query) {
    const parseHeaders = {
      headers: new HttpHeaders({
            // 'user-key':'cc5441053548ed186c2e6a3add7af2f1',
            // 'Accept':'application/json'   
           })
     };
  

    return this.http.post(this._url,  parseHeaders)    //data,this._proxy + 


  }

  reviewGet(query) {
    const parseHeaders = {
      headers: new HttpHeaders({
            // 'user-key':'cc5441053548ed186c2e6a3add7af2f1',
            // 'Accept':'application/json'   
           })
     };
  

    return this.http.get(this._url +`${query}`,  parseHeaders)    //data,this._proxy + 


  }

  reviewGetAll(query) {
    const parseHeaders = {
      headers: new HttpHeaders({
            // 'user-key':'cc5441053548ed186c2e6a3add7af2f1',
            // 'Accept':'application/json'   
           })
     };
  

    return this.http.get(this._url +`all/${query}`,  parseHeaders)    //data,this._proxy + 


  }

  
}