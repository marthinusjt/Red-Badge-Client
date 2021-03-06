import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { GameForumService } from '../game-forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthComponent } from 'src/app/core/auth/auth.component';
import { AdminService } from 'src/app/admin.service';


@Component({
  selector: 'app-forum-display',
  templateUrl: './forum-display.component.html',
  styleUrls: ['./forum-display.component.scss']
})
export class ForumDisplayComponent implements OnInit {

  public topicResults: any = [];  //???
  public replyResults: any = [];
  public userReply: {};
  public gameid: string;
  public category: string;
  public topicId: any;
  public id: any;
  public topic: any = {};
  public userId: number;
  public replyId: any;

  public value: string;

  public currentUser = JSON.parse(localStorage.getItem('currentUser'));

  public results3: any = []; // admin

  modalRef: MDBModalRef;

  constructor(
    private _topicSearch: GameForumService,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
    private _adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit() {
    JSON.parse(localStorage.getItem('currentUser')) ? this.userId = JSON.parse(localStorage.getItem('currentUser')).token.user.id : this.userId = undefined;
    console.log("userid:", JSON.parse(localStorage.getItem('currentUser')))
    this.gameid = this.route.snapshot.paramMap.get('gameid')
    this.category = this.route.snapshot.paramMap.get('category')
    this.topicId = this.route.snapshot.paramMap.get('topicId')
    this.value = this.route.snapshot.paramMap.get('value')
    console.log("ROUTE SNAPSHOT", this.route.snapshot)
    this.getAllTopics(this.gameid, this.category)
    this.getAllReplies(this.gameid, this.category, this.topicId)

    if(this.currentUser){
      if (this.currentUser.token.user.admin == true) {
        this.adminRelogin()
  
      }
    }
  }

  getAllTopics(query: string, category: string) {
    this._topicSearch.forumTopicGetAll(query, category)
      .subscribe(data => {
        this.topicResults = data; 
        console.log(this.topicResults);
        this.topic = this.topicResults.filter((e: { id: any; }) => {return e.id == this.topicId})[0];
        console.log("Topic: ", this.topic);
      })
  }

  getAllReplies(query: string, category: string, topicId: any) {
    this._topicSearch.forumReplyGetAll(query, category, topicId)
      .subscribe(data => {
        this.replyResults = data; 
        console.log(this.replyResults);

      })
  }

  createReply(textArea: any) {

    this._topicSearch.forumReplyPost(this.gameid, this.category, this.topicId, textArea)
      .subscribe(data => {
        this.userReply = data;
        console.log("User Reply: ", this.userReply);
        this.getAllReplies(this.gameid, this.category, this.topicId);
      })

  }

  editReply(id: any, textArea: any) {

    this._topicSearch.forumReplyEdit(this.gameid, this.category, this.topicId, id, textArea)
      .subscribe(data => {
        this.userReply = data;
        console.log("User Edit: ", this.userReply);
        this.getAllReplies(this.gameid, this.category, this.topicId);
      })

  }

  deleteReply(id: any) {

    this._topicSearch.forumReplyDelete(this.gameid, this.category, this.topicId, id)
      .subscribe(data => {
        this.userReply = data;
        console.log("User Edit: ", this.userReply);
        this.getAllReplies(this.gameid, this.category, this.topicId);
      })

  }

  editOriginal(id: any, textArea: any) {

    this._topicSearch.forumOriginalEdit(this.gameid, this.category, id, textArea)
      .subscribe(data => {
        this.userReply = data;
        console.log("User Edit: ", this.userReply);
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

    this._adminService.adminPinned(id, pinned)
      .subscribe(data => {
        this.getAllTopics(this.gameid, this.category);
      })


  }





  openModal() { 
    this.modalRef = this.modalService.show(AuthComponent);
  }

}
