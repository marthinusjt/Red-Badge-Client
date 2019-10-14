import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    loggedIn = false;

    constructor(
        private http: HttpClient,
        ) {

    }

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn)
                }, 800)
            }
        );
        return promise;
    }

    signup(firstName: string, lastName: string, userName: string, email: string, password: string) {
        return this.http.post(
            'http://localhost:3343/auth/signup',
            {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                password: password
            }
            
        ).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http.post(
            'http://localhost:3343/auth/login',
            {
                email: email,
                password: password
            },
        ).pipe(catchError(this.handleError));
    }

    logout() {
        this.loggedIn = false;
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred';
        if (!errorRes.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error) {
            case 'Validation error':
                errorMessage = 'The email or username you entered is already in use';
        }
        return throwError(errorMessage);
    }
}