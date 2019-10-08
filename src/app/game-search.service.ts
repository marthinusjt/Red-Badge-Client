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
      fields name, first_release_date, cover.*, storyline, summary;
      where themes != 42;
    `
    // if(type == 'people'){return this.http.get<Game[]>(this._url + 'people/?search=' + query)}
    return this.http.post(this._proxy + this._url, data, parseHeaders)
      // headers: new HttpHeaders ({
      //     'user-key':'cc5441053548ed186c2e6a3add7af2f1',
      //     'Accept':'application/json'
      // })

  }
}