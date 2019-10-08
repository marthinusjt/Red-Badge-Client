import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameSearch } from '../../../game-search.service'

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  

  public results: any = [];
  public searching: any = false;

  constructor(private _gameSearch: GameSearch,
    
    ) {}

  toggleSearching(){
    this.searching = !this.searching;
  }

  search(query){
    this.toggleSearching();
    this._gameSearch.fetch(query)
      .subscribe(data => {this.results = data; console.log(data); this.toggleSearching()})
  }

  ngOnInit() {
  }

}
