import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
// import { Game } from './game';
// import { Observable } from 'rxjs';



@Injectable()
export class GameReview {

  private _url2: string = `http://localhost:3343/review/`
  private _url: string = `https://api-v3.igdb.com/games`
  private _proxy: string = 'https://cors-anywhere.herokuapp.com/';

  


  constructor(private http: HttpClient) {}

  reviewFetch(query) {
    const parseHeaders = {
      headers: new HttpHeaders({
            'user-key':'cc5441053548ed186c2e6a3add7af2f1',
            'Accept':'application/json'    })
     };
  
    let data = `
    where id=${query};
    fields artworks.*, storyline, summary, name, release_dates.human, genres.name, platforms.*, videos.*;
`


    // if(type == 'people'){return this.http.get<Game[]>(this._url + 'people/?search=' + query)}
    return this.http.post(this._proxy + this._url, data, parseHeaders)
      // headers: new HttpHeaders ({
      //     'user-key':'cc5441053548ed186c2e6a3add7af2f1',
      //     'Accept':'application/json'
      // })

  }


  
  reviewPost(gameid, score, userName, headline, pros, cons, textArea) {


    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.token; // your token


    let body = {
    
    gameId: gameid,
    userName: userName,
    score: score,
    headline: headline,
    pros: pros,
    cons: cons,
    textArea: textArea
    }
    
    const parseHeaders2 = {
      headers: new HttpHeaders({
            'Authorization': token.sessionToken,
            'Content-Type':'application/json'    
           })
     };
  


    console.log(token.sessionToken)

    return this.http.post( this._url2, body,  parseHeaders2)    //data,this._proxy + 


  }

  reviewGet(query) {
    const parseHeaders = {
      headers: new HttpHeaders({
            // 'Authorization':`${token.sessionToken}`,
            // 'Content-Type':'application/json'   
           })
     };
  

    return this.http.get(this._url2 +`${query}`,  parseHeaders)    //data,this._proxy + 


  }

  reviewGetAll(query) {
    return this.http.get(this._url2 +`all/${query}`)    //data,this._proxy + 


  }

  
}