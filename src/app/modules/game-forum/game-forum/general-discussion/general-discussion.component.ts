import { Component, OnInit } from '@angular/core';

import { GameForumService } from '../game-forum.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-discussion',
  templateUrl: './general-discussion.component.html',
  styleUrls: ['./general-discussion.component.scss']
})
export class GeneralDiscussionComponent implements OnInit {

  public results: any = []
  public gameid: string;
  public category: string;


  constructor(
    private _topicSearch: GameForumService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.gameid = this.route.snapshot.paramMap.get('gameid')
    console.log(this.route.snapshot)
    this.category = this.route.snapshot.paramMap.get('category')
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

}
