import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
// import { Game } from './game';
// import { Observable } from 'rxjs';

@Injectable()
export class GameSearch {

  private _url: string = `https://api-v3.igdb.com/games`;
  
  private _proxy: string = 'https://cors-anywhere.herokuapp.com/';


  constructor(private http: HttpClient) {}

  
  fetch(query: string, offset: number) {
    const parseHeaders = {
      headers: new HttpHeaders({
            // 'user-key':'cc5441053548ed186c2e6a3add7af2f1', // Aaron's Key
            'user-key':'5a82182a64789d3546faae4b10160803', // Philips' Key
            'Accept':'application/json'
          })
     };
  
    let data = `
      search "${query}";
      offset ${offset};
      limit 50;
      fields name, release_dates.human, cover.url, genres.*, platforms.*;
      where themes != 42;
      `
      // fields name;
    
    return this.http.post(this._proxy + this._url, data, parseHeaders)
  }
}