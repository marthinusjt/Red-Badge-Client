import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
  public direct: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.direct = JSON.parse(localStorage.getItem('redirect'))
    //console.log(this.direct)

    localStorage.removeItem('redirect');
    if (this.direct==null) {this.router.navigate([`/`])}
    // if (this.direct==null) {window.history.go(-1);}
    this.router.navigate([`/${this.direct.redirect}`])
  }

}
