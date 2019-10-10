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
  public score: string;

public headline1: string;
  public score1: string;
  public textArea1: string;
  public pros1: string;
  public cons1: string;

  

  constructor(private _gameSearch: GameReview,
    private route: ActivatedRoute) {}

  setScore(insertscore){
    this.score=insertscore
  }



    gameFetch(query){
      
      this._gameSearch.reviewFetch(query)
        .subscribe(data => {this.results = data; console.log(data)})
    }

  searchGet(query){
    
    this._gameSearch.reviewGet(query)
      .subscribe(data => {this.results = data; console.log(data);
        this.setScore(this.results.score)
        this.headline1=this.results.headline
        this.textArea1=this.results.textArea
       this.pros1=this.results.pros
       this.cons1=this.results.cons
      //  console.log(this.pros1)
      
      }
      
      )

  }

  searchGetAll(gameid){
    
    this._gameSearch.reviewGetAll(gameid)
      .subscribe(data => {this.results = data; console.log(data)})
      
  }
  searchPost(gameid, score, userName, headline, pros, cons, textArea){
    
    this._gameSearch.reviewPost(gameid, this.score, userName, headline, pros, cons, textArea)
      .subscribe(data => {this.results = data; console.log(data)})
  }

  searchPut(gameid, score, userName, headline, pros, cons, textArea){
    
    this._gameSearch.reviewPut(gameid,  this.score, userName, headline, pros, cons, textArea)
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
