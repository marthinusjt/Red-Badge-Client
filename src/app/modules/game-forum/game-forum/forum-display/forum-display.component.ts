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
  public topicId: any;
  public id: any;
  public topic: {} = {};
  public userId: number;

  public value: string;

  public currentUser = JSON.parse(localStorage.getItem('currentUser'));

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
    this.value = this.route.snapshot.paramMap.get('value')
    console.log("ROUTE SNAPSHOT", this.route.snapshot)
    this.getAllTopics(this.gameid, this.category)
    this.getAllReplies(this.gameid, this.category, this.topicId)
  }

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
        console.log("User Reply: ", this.userReply);
        this.getAllReplies(this.gameid, this.category, this.topicId);
      })

  }

  editReply(query, category, topicId, id, textArea) {

    this._topicSearch.forumReplyEdit(this.gameid, this.category, this.topicId, id, textArea)
      .subscribe(data => {
        this.userReply = data;
        console.log("User Edit: ", this.userReply);
        this.getAllReplies(this.gameid, this.category, this.topicId);
      })

  }

  editOriginal(query, category, id, textArea) {

    this._topicSearch.forumOriginalEdit(this.gameid, this.category, id, textArea)
      .subscribe(data => {
        this.userReply = data;
        console.log("User Edit: ", this.userReply);
        this.getAllTopics(this.gameid, this.category);
      })

  }

  





  openModal() { 
    this.modalRef = this.modalService.show(AuthComponent);
  }

}
