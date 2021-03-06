import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import '../../assets/no-image.png';
import { GameSearch } from '../services/game-search.service';


@Component({
  selector: 'app-search-display',
  templateUrl: './search-display.component.html',
  styleUrls: ['./search-display.component.scss']
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
        this.offset = 0;
        this.query = this.route.snapshot.paramMap.get('searching');
        this.search2(this.query)
      });
    }
 


    

  toggleSearching(){
    this.searching = !this.searching;
  }

  search(query: any){
    this.toggleSearching();
    this._gameSearch.fetch(query, this.offset)
    .subscribe(data => {this.results = data;  this.toggleSearching(); console.log(data)})
    
  }
  search2(query: string){
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
    //this.search(this.query)



    
  }
  onEnter(query: any) {
    // this.router.navigate({path: `/search/${query}`})
    this.router.navigate([`/search/${query}`], {relativeTo: this.route})
    this.search2(query)
  }
}
