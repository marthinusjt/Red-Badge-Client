import { Component, OnInit, Input } from '@angular/core';
import { GameReview } from '../../../game-review.service'
// import { ɵHttpInterceptingHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AuthComponent } from '../../../core/auth/auth.component';

@Component({
  selector: 'app-game-review',
  templateUrl: './game-review.component.html',
  styleUrls: ['./game-review.component.scss']
})
export class GameReviewComponent implements OnInit {

  public results: any = [];
  public userReview: any = [];
  public allReviews: any = [];


  public searching: any = false;
  public gameid: string;
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
          this.results[0].artworks ? this.carousel = 'artwork' : null
        })
    }

  searchGet(query){
    
    this._gameSearch.reviewGet(query)
      .subscribe(data => { 
        this.userReview = data; console.log("userReview: ", this.userReview);
        this.setScore(this.userReview.score)
        this.headline1=this.userReview.headline
        this.textArea1=this.userReview.textArea
        this.pros1=this.userReview.pros
        this.cons1=this.userReview.cons
        //  console.log(this.pros1)

      }
      
      )

  }

  searchGetAll(gameid){
    
    this._gameSearch.reviewGetAll(gameid)
      .subscribe(data => {this.allReviews = data; console.log("allReviews: ", this.allReviews)})
      
  }
  searchPost(gameid, score, userName, headline, pros, cons, textArea){
    
    this._gameSearch.reviewPost(gameid, this.score, userName, headline, pros, cons, textArea)
      .subscribe(data => {this.userReview = data; console.log("userReview: ", this.userReview)
        this.searchGet(this.gameid)
      })
     
      // this.searchGet(this.gameid)

  }

  searchPut(gameid, score, userName, headline, pros, cons, textArea){
    
    this._gameSearch.reviewPut(gameid,  this.score, userName, headline, pros, cons, textArea)
      .subscribe(data => {this.userReview = data; console.log("userReview: ", this.userReview)
      this.searchGet(this.gameid)
      })
      
  }

  searchDelete(gameid, score, userName, headline, pros, cons, textArea){
    
    this._gameSearch.reviewDelete(gameid, score, userName, headline, pros, cons, textArea)
      .subscribe(data => {this.userReview = data; console.log("userReview: ", this.userReview)
      this.searchGet(this.gameid)
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


  ngOnInit() {
    this.gameid = this.route.snapshot.paramMap.get('gameid').split('#')[0];
    this.gameFetch(this.gameid)
    this.searchGetAll(this.gameid)

  

    // console.log(currentUser)
    this.currentUser ? this.searchGet(this.gameid) : null;
    
  }
  
}
