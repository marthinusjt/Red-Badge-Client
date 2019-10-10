import { Component, OnInit, Input } from '@angular/core';
import { GameReview } from '../../../game-review.service'
import { ɵHttpInterceptingHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-review',
  templateUrl: './game-review.component.html',
  styleUrls: ['./game-review.component.css']
})
export class GameReviewComponent implements OnInit {

  public results: any = [];
  public searching: any = false;
  public gameid: string;

  @Input () state: string;

  constructor(private _gameSearch: GameReview,
    private route: ActivatedRoute) {}

  

    gameFetch(query){
      
      this._gameSearch.reviewFetch(query)
        .subscribe(data => {this.results = data; console.log(data)})
    }

  searchGet(query){
    
    this._gameSearch.reviewGet(query)
      .subscribe(data => {this.results = data; console.log(data)})
  }

  searchGetAll(gameid){
    
    this._gameSearch.reviewGetAll(gameid)
      .subscribe(data => {this.results = data; console.log(data)})
  }
  searchPost(gameid, score, userName, headline, pros, cons, textArea){
    
    this._gameSearch.reviewPost(gameid, score, userName, headline, pros, cons, textArea)
      .subscribe(data => {this.results = data; console.log(data)})
  }

  searchPut(gameid, score, userName, headline, pros, cons, textArea){
    
    this._gameSearch.reviewPut(gameid, score, userName, headline, pros, cons, textArea)
      .subscribe(data => {this.results = data; console.log(data)})
  }

  searchDelete(gameid, score, userName, headline, pros, cons, textArea){
    
    this._gameSearch.reviewDelete(gameid, score, userName, headline, pros, cons, textArea)
      .subscribe(data => {this.results = data; console.log(data)})
      
  }


  ngOnInit() {
    this.gameid = this.route.snapshot.paramMap.get('gameid');
    this.gameFetch(this.gameid)
    this.searchGetAll(this.gameid)
    this.searchGet(this.gameid)
  }
}
