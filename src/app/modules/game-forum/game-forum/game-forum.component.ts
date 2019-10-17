import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-forum',
  templateUrl: './game-forum.component.html',
  styleUrls: ['./game-forum.component.scss']
})
export class GameForumComponent implements OnInit {
  public value: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.value = this.route.snapshot.paramMap.get('value')

  }

}
