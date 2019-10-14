import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';

import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AuthComponent } from '../auth/auth.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  modalRef: MDBModalRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: MDBModalService,
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isAuthenticated()
        .then(
          (authenticated: boolean) => {
            if (authenticated) {
              return true;
            } else {
              this.modalRef = this.modalService.show(AuthComponent);
              // this.router.navigate(['/']);
            }
          }
        );
    }

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, state);
    }

}
