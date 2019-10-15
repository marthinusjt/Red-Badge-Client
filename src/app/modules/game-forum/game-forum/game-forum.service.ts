import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Forum } from 'src/app/forum.model';
import { tokenName } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})

export class GameForumService {

    // private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // private token = this.currentUser.token;

    private _url: string = `https://api-v3.igdb.com/games`;
    private _url2: string = 'http://localhost:3343/forum/';
    private _proxy: string = 'https://cors-anywhere.herokuapp.com/';

    public query: string;
    
    constructor (
        private http: HttpClient,
    ) { }
    
    // forumGetAll(query): Observable<Forum[]> {
    //     return this.http.get(this._url2 + `all/${query}`)
    // }

    // forumPost(textArea: string, topic: string, userName: string,ownerId: number, gameId: number, category: string, topicId: number, pinned: boolean) {
    // forumPost(forum: Forum): Observable<Forum[]> {
        
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     let token = currentUser.token;

    //     let body = {
    //         pinned: pinned,
    //         userName: token.user.userName,
    //         topic: topic,
    //         topicId: topicId,
    //         ownerId: ownerId,
    //         gameId: gameId,
    //         textArea: textArea,
    //         category: category
    //     }

    //     const parseHeaders = {
    //         headers: new HttpHeaders({
    //             'Authorization': token.sessionToken,
    //             'Content-Type': 'application/json'
    //         })
    //     };
        
    //     return this.http.post(this._url2, body, parseHeaders)
    //     // return this.http.post<Forum[]>(this._url2, forum, parseHeaders)
    // }

    
}