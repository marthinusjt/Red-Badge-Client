import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { GameForumService } from '../game-forum.service';
import { ActivatedRoute } from '@angular/router';
import { AuthComponent } from 'src/app/core/auth/auth.component';

@Component({
  selector: 'app-forum-display',
  templateUrl: './forum-display.component.html',
  styleUrls: ['./forum-display.component.scss']
})
export class ForumDisplayComponent implements OnInit {

  public topicResults: any = [];
  public replyResults: any = [];
  public userReply: any;
  public gameid: any;
  public category: string;
  // public id: any;
  public topicId: any;
  public topic: {} = {};
  public userId: number;


  modalRef: MDBModalRef;

  constructor(
    private _topicSearch: GameForumService,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
  ) { }

  ngOnInit() {
    JSON.parse(localStorage.getItem('currentUser')) ? this.userId = JSON.parse(localStorage.getItem('currentUser')).token.user.id : this.userId = undefined;
    console.log("userid:", JSON.parse(localStorage.getItem('currentUser')))
    this.gameid = this.route.snapshot.paramMap.get('gameid')
    this.category = this.route.snapshot.paramMap.get('category')
    this.topicId = this.route.snapshot.paramMap.get('topicId')
    console.log(this.route.snapshot)
    // SINGULAR
    // this.getTopic(this.gameid, this.category, this.topicId)
    // ALL
    this.getAllTopics(this.gameid, this.category)
    this.getAllReplies(this.gameid, this.category, this.topicId)
  }

  // getTopic(query, category, topicId) {
  //   this._topicSearch.forumTopicGet(query, category, topicId)
  //     .subscribe(data => {
  //       this.topicResults = data; 
  //       console.log(this.topicResults);
  //     })
  // }

  getAllTopics(query, category) {
    this._topicSearch.forumTopicGetAll(query, category)
      .subscribe(data => {
        this.topicResults = data; 
        console.log(this.topicResults);
        this.topic = this.topicResults.filter(e => {return e.id == this.topicId})[0];
        console.log("Topic: ", this.topic);
      })
  }

  getAllReplies(query, category, topicId) {
    this._topicSearch.forumReplyGetAll(query, category, topicId)
      .subscribe(data => {
        this.replyResults = data; 
        console.log(this.replyResults);

      })
  }

  createReply(query, category, topicId, textArea) {

    this._topicSearch.forumReplyPost(this.gameid, this.category, this.topicId, textArea)
      .subscribe(data => {
        this.userReply = data;
        console.log(this.userReply);
        this.getAllReplies(this.gameid, this.category, this.topicId);
      })

  }

  





  openModal() { 
    this.modalRef = this.modalService.show(AuthComponent);
  }

}
