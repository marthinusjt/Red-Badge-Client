import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameSearch } from '../../../game-search.service'

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
  
})
export class SplashComponent implements OnInit {

  

  public results: any = [];
  public searching: any = false;
  public searchError: any = '';

  constructor(
    private _gameSearch: GameSearch,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit() {
  }

  toggleSearching(){
    this.searching = !this.searching;
  }

  search(query){
    this.toggleSearching();
    // if(query.length >= 3){}else {searchError = 'Please enter at least 3 characters.'}
    this._gameSearch.fetch(query, 0) //static offset, fix this
    .subscribe(data => {this.results = data; console.log(data); this.toggleSearching()})
  }

  onEnter(query) {
    // this.router.navigate({path: `/search/${query}`})
    this.router.navigate([`/search/${query}`], {relativeTo: this.route})
    this.search(query)
  }

}
