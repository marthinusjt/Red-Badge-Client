import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
  public direct: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.direct = JSON.parse(localStorage.getItem('redirect'))
    console.log(this.direct)
    
    if (this.direct==null) {this.router.navigate([`/`])}
    // this.router.navigate([`/${this.direct.redirect}`])
  }

}
