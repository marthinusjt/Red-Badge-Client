import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
// import { Game } from './game';
// import { Observable } from 'rxjs';

@Injectable()
export class GameSearch {

  private _url: string = `https://api-v3.igdb.com/games`
  private _proxy: string = 'https://cors-anywhere.herokuapp.com/';


  constructor(private http: HttpClient) {}

  
  fetch(query) {
    const parseHeaders = {
      headers: new HttpHeaders({
            'user-key':'5a82182a64789d3546faae4b10160803',
            'Accept':'application/json'    })
     };
  
    let data = `
      search "${query}";
      offset 0;
      limit 50;
      fields name ;
      where themes != 42;
    `
    //release_dates.human, cover.url, genres.*, platforms.*;
    return this.http.post(this._proxy + this._url, data, parseHeaders)
  }
}