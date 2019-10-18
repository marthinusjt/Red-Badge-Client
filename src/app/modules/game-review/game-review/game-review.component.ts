import { Component, OnInit, Input } from '@angular/core';

// import { ɵHttpInterceptingHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AuthComponent } from '../../../core/auth/auth.component';
import { GameReview } from 'src/app/services/game-review.service';

@Component({
  selector: 'app-game-review',
  templateUrl: './game-review.component.html',
  styleUrls: ['./game-review.component.scss']
})
export class GameReviewComponent implements OnInit {

  public results: any;
  public userReview: any;
  public allReviews: any = [];
  public avgScore: any;


  public searching: any = false;
  public gameid: string;
  public gameName: string;
  public score: string;
  public carousel: string;

public headline1: string;
  public score1: string;
  public textArea1: string;
  public pros1: string;
  public cons1: string;

  public currentUser = JSON.parse(localStorage.getItem('currentUser'));


  modalRef: MDBModalRef;

  

  constructor(
    private _gameSearch: GameReview,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
    ) {}

  setScore(insertscore){
    this.score=insertscore
  }



    gameFetch(query){
      
      this._gameSearch.reviewFetch(query)
        .subscribe(data => {
          this.results = data;
          console.log('IGDB data:', data);
          this.results[0].videos ? this.carousel = 'video' :
          this.results[0].screenshots ? this.carousel = 'screenshots' :
          this.results[0].artworks ? this.carousel = 'artwork' : null;
          this.changeAvgScore();
        })
    }

  searchGet(query){
    
    this._gameSearch.reviewGet(query)
      .subscribe(data => { 
        if(data){
          this.userReview = data; console.log("userReview: ", this.userReview);
          this.setScore(this.userReview.score)
          this.headline1=this.userReview.headline
          this.textArea1=this.userReview.textArea
          this.pros1=this.userReview.pros
          this.cons1=this.userReview.cons
          //  console.log(this.pros1)
        } else {console.log("data not found, refused to fetch")}
      }
      
      )

  }

  searchGetAll(gameid){
    
    this._gameSearch.reviewGetAll(gameid)
      .subscribe(data => {
        this.allReviews = data;
        this.allReviews.reverse();
        console.log("allReviews: ", this.allReviews);
        this.changeAvgScore()
      })
      
  }

  searchPost(gameid, score, userName, headline, pros, cons, textArea){
    
    this._gameSearch.reviewPost(gameid, this.score, userName, headline, pros, cons, textArea)
      .subscribe(data => {
        this.userReview = data;
        console.log("userReview: ",
        this.userReview)
        this.searchGet(this.gameid);
        this.searchGetAll(this.gameid);
      })
     
      // this.searchGet(this.gameid)

  }

  searchPut(gameid, score, userName, headline, pros, cons, textArea){
    
    this._gameSearch.reviewPut(gameid,  this.score, userName, headline, pros, cons, textArea)
      .subscribe(data => {
        this.userReview = data;
        console.log("userReview: ", this.userReview);
        this.searchGet(this.gameid);
        this.searchGetAll(this.gameid);
      })
      
  }

  searchDelete(gameid, score, userName, headline, pros, cons, textArea){
    
    this._gameSearch.reviewDelete(gameid, score, userName, headline, pros, cons, textArea)
      .subscribe(data => {
        this.userReview = undefined;
        console.log("userReview deleted: ", this.userReview);
        this.searchGetAll(this.gameid);
      })
      
      
      
  }

  openModal() {
    
    this.modalRef = this.modalService.show(AuthComponent);
  }

  youTube(id){
    return "https://www.youtube.com/embed/" + id
  }

  changeCarousel(type){
    this.carousel = type;
  }

  changeAvgScore(){
    if(this.results && this.allReviews){
      // this.avgScore = (this.allReviews.reduce((a,b) => a + b.score, 0) + this.results[0].total_rating / 10) / (this.results[0].total_rating_count + this.allReviews.length );
      this.avgScore = ((this.results[0].total_rating / 10 * this.results[0].total_rating_count + (this.allReviews.reduce((a,b) => a + b.score, 0))) / (this.allReviews.length + this.results[0].total_rating_count));
      console.log("avgScore: ", this.avgScore);
    } else if(this.results) {
      this.avgScore = this.results[0].total_rating / 10;
    }
  }


  ngOnInit() {
    // this.gameid = this.route.snapshot.paramMap.get('gameid').split('#')[0];
    this.gameid = this.route.snapshot.paramMap.get('gameid');
    this.gameName = this.route.snapshot.paramMap.get('value');
    this.gameFetch(this.gameid)
    this.searchGetAll(this.gameid)

  

    console.log(this.currentUser)
    this.currentUser ? this.searchGet(this.gameid) : null;
    
  }
  
}
