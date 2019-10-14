import { Component, OnInit } from '@angular/core';

import { AuthComponent } from '../../auth/auth.component';

import { AuthService } from '../../auth/auth.service';

import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  openModal() {
    this.modalRef = this.modalService.show(AuthComponent);
  }

  onLogout() {
    localStorage.clear();
    this.authService.isLoggedIn = false;
  }

}
