import { Component, OnInit } from '@angular/core';

import { AuthComponent } from '../../auth/auth.component';

import { AuthService } from '../../auth/auth.service';

import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  modalRef: MDBModalRef;

  public currentUser: string = JSON.parse(localStorage.getItem('currentUser'));
  public direct: any = [];

  constructor(
    private modalService: MDBModalService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log(this.currentUser);
    localStorage.setItem('redirect', JSON.stringify({ redirect: this.direct }));

    for(let i=0; i <this.route.snapshot.url.length; i++){
      //console.log(this.route.snapshot.url[i].path)

      this.direct= this.direct+`/${this.route.snapshot.url[i].path}`

      localStorage.setItem('redirect', JSON.stringify({ redirect: this.direct }));
    }
  }

  openModal() {

    this.modalRef = this.modalService.show(AuthComponent);
  }

  onLogout() {
    localStorage.removeItem('currentUser');
    this.currentUser = undefined;
    this.authService.isLoggedIn = false;

    
  }

}
