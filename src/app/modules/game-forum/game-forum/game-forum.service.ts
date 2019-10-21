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

    // HEROKU URL
    private _url2: string = 'https://criticalhitsserver.herokuapp.com/forumTopic/';
    private _url3: string = 'https://criticalhitsserver.herokuapp.com/forumReply/';
    
    // LOCALHOST
    // private _url2: string = 'http://localhost:3343/forumTopic/';
    // private _url3: string = 'http://localhost:3343/forumReply/';
    
    // public query: string;
    
    constructor (
        private http: HttpClient,
    ) { }

    // FORUM REPLIES

    forumReplyGetAll(query, category, topicId) {
        return this.http.get(this._url3 + `all/${query}/${category}/${topicId}`)
    }

    forumReplyPost(query, category, topicId, textArea) {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.token;

        let body = {

            textArea: textArea
            
        }

        const parseHeaders = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token.sessionToken
            })
        };

        return this.http.post(this._url3 +`${query}/${category}/${topicId}`, body, parseHeaders)
        
    }

    forumReplyEdit(query, category, topicId, id, textArea) {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.token;

        let body = {

            textArea: textArea
            
        }

        const parseHeaders = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token.sessionToken
            })
        };

        return this.http.put(this._url3 +`/${id}`, body, parseHeaders)
        
    }

    forumReplyDelete(query, category, topicId, id) {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.token;

        const parseHeaders = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token.sessionToken
            })
        };

        return this.http.delete(this._url3 +`/${id}`, parseHeaders)
        
    }



    // FORUM TOPICS

    // ALL
    forumTopicGetAll(query, category) {
        return this.http.get(this._url2 + `all/${query}/${category}`)
        //data,this._proxy +     
    }

    forumTopicPost(query, category, pinned, textArea, topic) {

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

    forumOriginalEdit(query, category, id, textArea) {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.token;

        let body = {

            textArea: textArea
            
        }

        const parseHeaders = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token.sessionToken
            })
        };

        return this.http.put(this._url2 +`${query}/${category}/${id}`, body, parseHeaders)
        
    }
    
}