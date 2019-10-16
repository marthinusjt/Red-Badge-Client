import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Forum } from 'src/app/forum.model';
import { tokenName } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})

export class GameForumService {

    private _url: string = `https://api-v3.igdb.com/games`;
    private _proxy: string = 'https://cors-anywhere.herokuapp.com/';
    
    private _url2: string = 'http://localhost:3343/forumTopic/';
    
    // public query: string;
    
    constructor (
        private http: HttpClient,
    ) { }

    forumTopicGetAll(query, category) {
        return this.http.get(this._url2 +`all/${query}/${category}`)
        //data,this._proxy +     
      }
    
}