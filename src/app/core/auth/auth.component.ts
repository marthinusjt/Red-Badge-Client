import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { of } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit { 
    isLoginPage: boolean = true;
    error: string = null;
    public resData: any;

    forbiddenUsernames = ['Aaron']

    validatingForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private modalService: MDBModalService,
        private route: ActivatedRoute,
        ) {}

    ngOnInit() {
        this.validatingForm = new FormGroup({
            'firstName': new FormControl(null),
            'lastName': new FormControl(null),
            'userName': new FormControl('', [Validators.minLength(3), Validators.maxLength(25), this.forbiddenNames.bind(this)]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(1)])
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
                this.resData=resData
                //console.log(this.resData.user.id);
                //this.direct = JSON.parse(localStorage.getItem('redirect'))
                //localStorage.setItem('currentUser', JSON.stringify({ token: resData }));
                //this.modalService.hide(1)
                //location.reload();
                if(this.resData.user.banned){
                    return alert('warning this user is banned')
                }else{
                    localStorage.setItem('currentUser', JSON.stringify({ token: resData }));
                }
                

                 if (localStorage.getItem('currentUser') !== null) {
                    //console.log('test');
                    this.authService.isLoggedIn = true;
                this.modalService.hide(1)
                

                    return of(this.authService.isLoggedIn,
                        this.router.navigate(['/redirect'],  { relativeTo: this.route, skipLocationChange: true })
                          );
                };

            }, errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                });
        } else {
            this.authService.signup(firstName, lastName, userName, email, password).subscribe(resData => {
                console.log(resData);
                localStorage.setItem('currentUser', JSON.stringify({ token: resData }));
                this.modalService.hide(1)
                //location.reload();
                this.router.navigate(['/redirect'],  { relativeTo: this.route, skipLocationChange: true })
            }, errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                });
        }

        this.validatingForm.reset();
    }

    forbiddenNames(control: FormControl): {[s: string]: boolean} {
        if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
          return {'nameIsForbidden': true};
        }
        return null;
    }
}