import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';

import { GameForumService } from '../../game-forum.service';

@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.scss']
})
export class ForumPostComponent implements OnInit {

  useBtn: false;
  createForumPost: FormGroup;
  forumPost = [];

  category: object = [
    'Announcements', 'General Discussions'
  ]

  constructor(
    private gameForumService: GameForumService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    
  }

  // onSubmit(textArea: string, topic: string, userName: string,ownerId: number, gameId: number, category: string, topicId: number, pinned: boolean) {
  //   this.gameForumService.forumPost(textArea, topic, userName, ownerId, gameId, category, topicId, pinned)
  //     .subscribe(data => {this.forumPost = data; console.log(data)
  //       this.searchGet(this.gameid)
  //     })
  // }

}