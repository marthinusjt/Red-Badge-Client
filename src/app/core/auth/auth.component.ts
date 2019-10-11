import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit { 
    isLoginPage = true;
    isLoading = false;
    error: string = null;

    

    // mdbCode
    validatingForm: FormGroup;

    // ourCode
    constructor(
        private authService: AuthService,
        private router: Router,
        private modalService: MDBModalService,
        ) {}

    // mdbCode
    ngOnInit() {
        this.validatingForm = new FormGroup({
            'firstName': new FormControl(null),
            'lastName': new FormControl(null),
            'userName': new FormControl(null),
            'email': new FormControl(null, Validators.email),
            'password': new FormControl(null, Validators.required)
        });
    }

    get firstName() {
        return this.validatingForm.get('firstName');
    }

    get lastName() {
        return this.validatingForm.get('lastName');
    }

    get userName() {
        return this.validatingForm.get('userName');
    }
    
    get email() {
        return this.validatingForm.get('email');
    }

    get password() {
        return this.validatingForm.get('password');
    }

    // ourCode
    onSwitchMode () {
        this.isLoginPage = !this.isLoginPage;
    }

    onSubmit () {
        
        if(!this.validatingForm.valid){
            return;
        }
        const firstName = this.validatingForm.value.firstName;
        const lastName = this.validatingForm.value.lastName;
        const userName = this.validatingForm.value.userName;
        const email = this.validatingForm.value.email;
        const password = this.validatingForm.value.password;

        // this.isLoading = true;
        if (this.isLoginPage) {
            this.authService.login(email, password).subscribe(
                
                resData => {
                console.log(resData);
                localStorage.setItem('currentUser', JSON.stringify({ token: resData }));
                // this.modalService.hide(1)
                location.reload();
            }, errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                });
        } else {
            this.authService.signup(firstName, lastName, userName, email, password).subscribe(resData => {
                console.log(resData);
                localStorage.setItem('currentUser', JSON.stringify({ token: resData }));
                // this.modalService.hide(1)
                location.reload();
            }, errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                });
        }

        this.validatingForm.reset();
    }
}