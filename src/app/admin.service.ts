import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _url: string = `http://localhost:3343/auth/admin/`

  constructor(private http: HttpClient) { }


  adminSGetAll() {

    
    return this.http.get(this._url+ 'all/')    //data,this._proxy + 


  }

  

  adminSPut(firstName, lastName, userName, admin, banned, id) {


    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser.token; // your token


    let body = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    admin: admin,
    banned: banned

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

}
