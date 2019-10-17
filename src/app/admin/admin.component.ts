import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public results: any = [];
  public results2: any = [];
  public results3: any = [];
  public userName: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public admin: boolean;
  private banned: boolean= false;
  

  constructor(
    private _adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  setBanned(setbanned, getId){

    for(let i=0; i<this.results.length;i++){
      if(this.results[i].id == getId) {
        this.results[i].banned=!this.results[i].banned
        //console.log('hit')
      }
      
    }
    
    //console.log(this.results)
    
  }

  setAdmin(setbanned, getId){

    for(let i=0; i<this.results.length;i++){
      if(this.results[i].id == getId) {
        this.results[i].admin=!this.results[i].admin
        //console.log('hit')
      }
      
    }
    
    //console.log(this.results)
    
  }

  adminLogIn(){

    this.adminRelogin()



    this._adminService.adminPost()
    .subscribe(data => {this.results2 = data; console.log(data)
    if(this.results2.user){
      this.adminGetAll()
    } else{
      this.router.navigate(['/'])
    }
  
  })
    
  }


  adminRelogin(){
    this._adminService.adminGet()
    .subscribe(data => {this.results3 = data; console.log(data) 

      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let token = currentUser.token; // your token
        // console.log(token.user)
        // console.log(this.results3.user)


      if(this.results3.user.admin !=token.user.admin){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.banned !=token.user.banned){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.email !=token.user.email){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.firstName !=token.user.firstName){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.lastName !=token.user.lastName){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.id !=token.user.id){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.password !=token.user.password){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.userName !=token.user.userName){
        this.router.navigate(['/'])
      } 
      if(!this.results3.user.admin){
        this.router.navigate(['/'])
      } 
      localStorage.setItem('currentUser', JSON.stringify({ token: this.results3 }));
    } 
    
    )
    
    
    this._adminService.adminGet()
    .subscribe(data => {this.results3 = data; console.log(data) 

      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let token = currentUser.token; // your token
        // console.log(token.user)
        // console.log(this.results3.user)


      if(this.results3.user.admin !=token.user.admin){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.banned !=token.user.banned){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.email !=token.user.email){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.firstName !=token.user.firstName){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.lastName !=token.user.lastName){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.id !=token.user.id){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.password !=token.user.password){
        this.router.navigate(['/'])
      } 
      if(this.results3.user.userName !=token.user.userName){
        this.router.navigate(['/'])
      } 
      if(!this.results3.user.admin){
        this.router.navigate(['/'])
      } 
    }    );

    
  }

  adminGetAll(){
    
    this._adminService.adminSGetAll()
      .subscribe(data => {this.results = data; console.log(data)})
      
  }

  
  adminPut(firstName, lastName, userName, admin, banned, id, email){

    //console.log('banned', banned)
    
    this._adminService.adminSPut(firstName, lastName, userName, admin, banned, id, email)
      .subscribe(data => {this.results = data; console.log(data)
      this.adminGetAll()
      })
      
  }

  ngOnInit() {

    this.adminLogIn()
    
   
  }

}
