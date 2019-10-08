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
            'user-key':'cc5441053548ed186c2e6a3add7af2f1',
            'Accept':'application/json'    })
     };
  
    let data = `
      search "${query}";
      offset 0;
      limit 50;
      fields name, release_dates.human, cover.url, genres.*, platforms.*;
      where themes != 42;
    `
    
    return this.http.post(this._proxy + this._url, data, parseHeaders)
  }
}