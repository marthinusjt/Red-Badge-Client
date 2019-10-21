import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthComponent } from 'src/app/core/auth/auth.component';

import { GameForumService } from '../game-forum.service';

import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-general-discussion',
  templateUrl: './general-discussion.component.html',
  styleUrls: ['./general-discussion.component.scss']
})
export class GeneralDiscussionComponent implements OnInit {

  public results: any = [];
  public userTopic: any;
  public gameid: any;
  public category: string;
  public value: string;
  public results3: any = []; //admin

  public currentUser = JSON.parse(localStorage.getItem('currentUser'));

  modalRef: MDBModalRef;


  constructor(
    private _topicSearch: GameForumService,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
    private _adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.gameid = this.route.snapshot.paramMap.get('gameid')
    console.log(this.route.snapshot)
    this.category = this.route.snapshot.paramMap.get('category')
    this.value = this.route.snapshot.paramMap.get('value')
    this.getAllTopics(this.gameid, this.category)
    
    if(this.currentUser){
    if (this.currentUser.token.user.admin == true) {
      this.adminRelogin()

    }
  }
  }

  getAllTopics(query, category) {
    this._topicSearch.forumTopicGetAll(query, category)
      .subscribe(data => {
        this.results = data; 
        this.results.reverse();
        console.log(this.results);
      })
  }

  createTopic(query, category, pinned, textArea, topic) {

    this._topicSearch.forumTopicPost(this.gameid, this.category, pinned, textArea, topic)
      .subscribe(data => {
        this.userTopic = data;
        console.log(this.userTopic);
        this.getAllTopics(this.gameid, this.category);
      })

  }


  adminRelogin(){
    this._adminService.adminGet()
    .subscribe(data => {this.results3 = data; console.log(data) 

      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let token = currentUser.token; // your token
        // console.log(token.user)
        // console.log(this.results3.user)


      if(this.results3.user.admin !=token.user.admin){
        localStorage.clear()
        return this.router.navigate(['/'])
      } 
      if(this.results3.user.banned !=token.user.banned){
        localStorage.clear()
        return this.router.navigate(['/'])
      } 
      if(this.results3.user.email !=token.user.email){
        localStorage.clear()
        return this.router.navigate(['/'])
      } 
      if(this.results3.user.firstName !=token.user.firstName){
        localStorage.clear()
        return this.router.navigate(['/'])
      } 
      if(this.results3.user.lastName !=token.user.lastName){
        localStorage.clear()
        return this.router.navigate(['/'])
      } 
      if(this.results3.user.id !=token.user.id){
        localStorage.clear()
        return this.router.navigate(['/'])
      } 
      if(this.results3.user.password !=token.user.password){
        localStorage.clear()
        return this.router.navigate(['/'])
      } 
      if(this.results3.user.userName !=token.user.userName){
        localStorage.clear()
        return this.router.navigate(['/'])
      } 
      if(!this.results3.user.admin){
        localStorage.clear()
        return this.router.navigate(['/'])
      } 
      localStorage.setItem('currentUser', JSON.stringify({ token: this.results3 }));
    } 
    
    )
    
    
    this._adminService.adminGet()
    .subscribe(data => {this.results3 = data; console.log(data) 

      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let token = currentUser.token; // your token
        // console.log(token.user)
        // console.log(this.results3.user)


      if(this.results3.user.admin !=token.user.admin){
        localStorage.clear()
        this.router.navigate(['/'])
      } 
      if(this.results3.user.banned !=token.user.banned){
        localStorage.clear()
        this.router.navigate(['/'])
      } 
      if(this.results3.user.email !=token.user.email){
        localStorage.clear()
        this.router.navigate(['/'])
      } 
      if(this.results3.user.firstName !=token.user.firstName){
        localStorage.clear()
        this.router.navigate(['/'])
      } 
      if(this.results3.user.lastName !=token.user.lastName){
        localStorage.clear()
        this.router.navigate(['/'])
      } 
      if(this.results3.user.id !=token.user.id){
        localStorage.clear()
        this.router.navigate(['/'])
      } 
      if(this.results3.user.password !=token.user.password){
        localStorage.clear()
        this.router.navigate(['/'])
      } 
      if(this.results3.user.userName !=token.user.userName){
        localStorage.clear()
        this.router.navigate(['/'])
      } 
      if(!this.results3.user.admin){
        localStorage.clear()
        this.router.navigate(['/'])
      } 
    }    );

    
  }

  isPinned(id, pinned){

    this._adminService.adminPinned( id, pinned)
      .subscribe(data => {
        this.results = data;
        console.log("pinned", this.results);
        this.getAllTopics(this.gameid, this.category)
      })


  }

  openModal() { 
    this.modalRef = this.modalService.show(AuthComponent);

  }

}
