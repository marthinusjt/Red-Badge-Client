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

  



  searchGet(query){
    
    this._gameSearch.reviewGet(query)
      .subscribe(data => {this.results = data; console.log(data)})
  }

  searchGetAll(query){
    
    this._gameSearch.reviewGetAll(query)
      .subscribe(data => {this.results = data; console.log(data)})
  }

  ngOnInit() {
    this.gameid = this.route.snapshot.paramMap.get('gameid');
  }
}
