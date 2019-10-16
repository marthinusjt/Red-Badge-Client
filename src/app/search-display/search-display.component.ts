import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameSearch } from '../game-search.service'
import '../../assets/no-image.png';


@Component({
  selector: 'app-search-display',
  templateUrl: './search-display.component.html',
  styleUrls: ['./search-display.component.css']
})
export class SearchDisplayComponent implements OnInit {

  

  public results: any = [];
  public searching: any = false;
  public query: string;
  public value: string;
  public offset: number = 0;
  

  constructor(
    private _gameSearch: GameSearch,
    private route: ActivatedRoute,
    private router: Router,
    ) {
      route.params.subscribe(val => {
        this.query = this.route.snapshot.paramMap.get('searching');
        this.search(this.query)
      });
    }


    

  toggleSearching(){
    this.searching = !this.searching;
  }

  search(query){
    this.toggleSearching();
    this._gameSearch.fetch(query, this.offset)
    .subscribe(data => {this.results = data;  this.toggleSearching(); console.log(data)})
    
  }
  search2(query){
    this.toggleSearching();
    this._gameSearch.fetch(query, this.offset)
    .subscribe(data => {this.results = data;  this.toggleSearching(); console.log(data)})
    
  }

  nextPage(){
    if(this.offset < 150){
      this.offset = this.offset + 50
      this.search2(this.query)
    }
  }

  prevPage(){
    if(this.offset > 0){
      this.offset = this.offset - 50
      this.search2(this.query)
    }
  }

  ngOnInit() {
    this.query = this.route.snapshot.paramMap.get('searching');



    
  }
  onEnter(query) {
    // this.router.navigate({path: `/search/${query}`})
    this.router.navigate([`/search/${query}`], {relativeTo: this.route})
    this.search2(query)
  }
}
