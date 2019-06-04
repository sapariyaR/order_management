import { AuthenticationService } from './../service/AuthenticationService';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  isLogedIn;
  user;
  
  constructor(private authenticationService:AuthenticationService ) { }

  ngOnInit() {
    this.isLogedIn = this.authenticationService.isLoggedIn();
     if(this.isLogedIn){
       this.user = this.authenticationService.getUser();
     }
  }

  ngOnChanges() {
    this.isLogedIn = this.authenticationService.isLoggedIn();
     if(this.isLogedIn){
       this.user = this.authenticationService.getUser();
     }
  }

  signOut(){
    this.authenticationService.logout();
    this.isLogedIn = false;
  }

}
