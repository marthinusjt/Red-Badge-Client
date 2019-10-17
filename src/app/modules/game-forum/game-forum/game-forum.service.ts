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

    private _url3: string = 'http://localhost:3343/forumReply/';
    
    // public query: string;
    
    constructor (
        private http: HttpClient,
    ) { }

    forumReplyGetAll(query, category, topicId) {
        return this.http.get(this._url3 + `all/${query}/${category}/${topicId}`)
    }

    // SINGULAR
    // forumTopicGet(query, category, topicId) {
    //     return this.http.get(this._url2 + `${query}/${category}/${topicId}`)
    //     //data,this._proxy +     
    // }

    // ALL
    forumTopicGetAll(query, category) {
        return this.http.get(this._url2 + `all/${query}/${category}`)
        //data,this._proxy +     
    }

    forumTopicPost(query: number, category: string, pinned: boolean, textArea: string, topic: string) {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.token;

        let body = {

            pinned: pinned,
            topic: topic,
            textArea: textArea
            
        }

        const parseHeaders = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token.sessionToken
            })
        };

        return this.http.post(this._url2 +`${query}/${category}`, body, parseHeaders)
        
    }
    
}