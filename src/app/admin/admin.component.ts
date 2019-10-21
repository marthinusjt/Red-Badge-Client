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
  public results4: any = [];
  public results5: any = [];
  public results6: any = [];
  public results7: any = [];
  public userName: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public admin: boolean;
  private banned: boolean= false;
  public person: string;
  public value1: any;
  

  constructor(
    private _adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  setBanned(setbanned: any, getId: any){

    for(let i=0; i<this.results.length;i++){
      if(this.results[i].id == getId) {
        this.results[i].banned=!this.results[i].banned
        //console.log('hit')
      }
      
    }
    
    //console.log(this.results)
    
  }

  setAdmin(setbanned: any, getId: any){

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

  searchPerson(person: { toLowerCase: () => string; }){
    this._adminService.adminSGetAll()
      .subscribe(data => {this.results = data;
      
        this.person=person.toLowerCase()

        for(let i=0; i<this.results.length+1;i++){
          console.log('hit', i)
          
          for(let j=0; j<this.person.length;j++){
    
            if(this.results[i].userName.charAt(j).toLowerCase() != this.person.charAt(j)){
    
              console.log(this.results[i].userName.charAt(j).toLowerCase())
              console.log(this.person.charAt(j))
              // console.log(this.results)
              // this.results[i]=null
               this.results.splice (i,1)

               j=j-1

              
              

          } 
    }
    
      }


      })
  

}

  
  adminPut(firstName: any, lastName: any, userName: any, admin: any, banned: any, id: any, email: any){

    //console.log('banned', banned)
    
    this._adminService.adminSPut(firstName, lastName, userName, admin, banned, id, email)
      .subscribe(data => {this.results = data; console.log(data)
      this.adminGetAll()
      })
      
  }

  adminDelete(id: any){

    this._adminService.adminGetForm(id)
    .subscribe(data => {this.results5 = data; console.log(data)
    
    for(let i = 0; i<this.results5.length; i++){


      this._adminService.adminFormPut(this.results5[i].id)
      .subscribe(data => {this.results4 = data; console.log(data)   
      })
    }
    })

    this._adminService.adminGetReply(id)
    .subscribe(data => {this.results6 = data; console.log(data)
    
    for(let j = 0; j<this.results6.length; j++){


      this._adminService.adminReplyPut(this.results6[j].id)
      .subscribe(data => {this.results4 = data; console.log(data)
      
      })

    }

    })

    this._adminService.adminGetReview(id)
    .subscribe(data => {this.results7 = data; console.log(data)
    
    for(let i = 0; i<this.results7.length; i++){


      this._adminService.adminReviewDelete(this.results7[i].id)
      .subscribe(data => {this.results4 = data; console.log(data)   
      })
    }
    })

    this._adminService.adminSDelete(id)
    .subscribe(data => {this.results = data; console.log(data)
    this.adminGetAll()
    })


  }

  adminExpunge(id: any){

    this._adminService.adminGetForm(id)
    .subscribe(data => {this.results5 = data; console.log(data)
    
    for(let i = 0; i<this.results5.length; i++){


      this._adminService.adminFormDelete(this.results5[i].id)
      .subscribe(data => {this.results4 = data; console.log(data)   
      })
    }
    })

    this._adminService.adminGetReply(id)
    .subscribe(data => {this.results6 = data; console.log(data)
    
    for(let j = 0; j<this.results6.length; j++){


      this._adminService.adminReplyDelete(this.results6[j].id)
      .subscribe(data => {this.results4 = data; console.log(data)
      
      })

    }

    })


    this._adminService.adminGetReview(id)
    .subscribe(data => {this.results7 = data; console.log(data)
    
    for(let i = 0; i<this.results7.length; i++){


      this._adminService.adminReviewDelete(this.results7[i].id)
      .subscribe(data => {this.results4 = data; console.log(data)   
      })
    }
    })

    this._adminService.adminSDelete(id)
    .subscribe(data => {this.results = data; console.log(data)
    this.adminGetAll()
    })


  }
  ngOnInit() {

    this.adminLogIn()
    
   
  }

}
