import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
   
  constructor() { }
  handler:any = null;
  ngOnInit() {
 
    // this.loadStripe();
  }
 
  pay(amount) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });
 
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
 
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
}


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// import { AuthenticationService } from './_services';
// import { User } from './_models';

// import './_content/app.less';

// @Component({ selector: 'app', templateUrl: 'app.component.html' })
// export class AppComponent {
//     currentUser: User;

//     constructor(
//         private router: Router,
//         private authenticationService: AuthenticationService
//     ) {
//         this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
//     }

//     logout() {
//         this.authenticationService.logout();
//         this.router.navigate(['/login']);
//     }
// }