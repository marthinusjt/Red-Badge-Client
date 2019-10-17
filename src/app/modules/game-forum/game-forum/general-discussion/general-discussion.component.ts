import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthComponent } from 'src/app/core/auth/auth.component';

import { GameForumService } from '../game-forum.service';

import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';

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

  public currentUser = JSON.parse(localStorage.getItem('currentUser'));

  modalRef: MDBModalRef;


  constructor(
    private _topicSearch: GameForumService,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
  ) { }

  ngOnInit() {
    this.gameid = this.route.snapshot.paramMap.get('gameid')
    console.log(this.route.snapshot)
    this.category = this.route.snapshot.paramMap.get('category')
    this.value = this.route.snapshot.paramMap.get('value')
    this.getAllTopics(this.gameid, this.category)
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



  openModal() { 
    this.modalRef = this.modalService.show(AuthComponent);
  }

}
