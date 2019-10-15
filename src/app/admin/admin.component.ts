import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public results: any = [];
  public userName: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public admin: boolean;
  public banned: boolean;

  constructor(
    private _adminService: AdminService,
  ) { }

  adminGetAll(){
    
    this._adminService.adminSGetAll()
      .subscribe(data => {this.results = data; console.log(data)})
      
  }

  
  adminPut(firstName, lastName, userName, admin, banned, id){
    
    this._adminService.adminSPut(firstName, lastName, userName, admin, banned, id)
      .subscribe(data => {this.results = data; console.log(data)
      this.adminGetAll()
      })
      
  }

  ngOnInit() {
    this.adminGetAll()
  }

}
