import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _url: string = `http://localhost:3343/admin/admin/`

  constructor(private http: HttpClient) { }


  adminSGetAll() {

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser.token; // your token

    const parseHeaders2 = {
      headers: new HttpHeaders({
            'Authorization': token.sessionToken,
            'Content-Type':'application/json'    
           })
     };

    
    return this.http.get(this._url+ 'all/',  parseHeaders2)    //data,this._proxy + 


  }

  

  adminSPut(firstName, lastName, userName, admin, banned, id, email) {


    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser.token; // your token


    let body = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    admin: admin,
    banned: banned,
    email: email

    }
    
    const parseHeaders2 = {
      headers: new HttpHeaders({
            'Authorization': token.sessionToken,
            'Content-Type':'application/json'    
           })
     };
  


    // console.log(token.user.userName)

    return this.http.put( this._url + 'delete/', body,  parseHeaders2)    //data,this._proxy + 


  }

  adminPost() {


    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser.token; // your token

//console.log('here', token)
    let body = {
    
      email: token.user.email, 
      firstName: token.user.firstName, 
      lastName: token.user.lastName, 
      userName: token.user.userName, 
      password: token.user.password,
    }
    
    const parseHeaders2 = {
      headers: new HttpHeaders({
            'Authorization': token.sessionToken,
            'Content-Type':'application/json'    
           })
     };
  


    // console.log(token.user.userName)

    return this.http.post( this._url+'login', body,  parseHeaders2)    //data,this._proxy + 


  }

  adminGet() {


    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser.token; // your token

//console.log('here', token)
    let body = {
      email: token.user.email, 
      password: token.user.password,
    }
    
  


    // console.log(token.user.userName)

    return this.http.post('http://localhost:3343/auth/login2', body)    //data,this._proxy + 


  }

}
