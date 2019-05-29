import { APIConstant, RouteConstants, AppConstant } from './../../utility-module/Constants';
import { APIManager } from '../service/ApiManagerService';
import { Utils } from '../../utility-module/Utils';
import { AuthenticationService } from './../service/AuthenticationService';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  username:string;
  password:string;
  timeZone:string;
  @ViewChild('passwordInput') passwordInput:ElementRef;

  constructor(private router: Router,private auth: AuthenticationService,
    private utils : Utils,private snackBar: MatSnackBar,
    private aPIManager : APIManager) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigate([RouteConstants.DASHBOARD_ROUTE]);
    }
  }

  login() {
    if (this.validateForm()) {
      this.auth.logout();
      this.timeZone = new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
      let params = new HttpParams()
        .set('password', this.password)
        .set('username', this.username)
        .set('grant_type', 'password');
      this.aPIManager.postAPI(APIConstant.LOGIN, params.toString(), this.aPIManager.HttpOptions_3, false, true).subscribe(response => {
        if (response != undefined && response != null) {
          let user = {};
          user["id"] = response.id;
          user["name"] = response.name;
          user["email"] = response.email;
          user["role"] = response.role;
          this.auth.setUser(user);
          this.auth.setToken(response.access_token);
          this.snackBar.open("Login successful", "close", {duration: AppConstant.SNACKBAR_TIMEOUT});
          this.router.navigate([RouteConstants.DASHBOARD_ROUTE]);
        } else {
          this.password = ""
        }
      }, error1 => {
        this.password = ""
        this.snackBar.open(error1.message, "close", {duration: AppConstant.SNACKBAR_TIMEOUT,});
      }
      );
    }
  }

  validateForm():boolean{
    if(this.username == undefined  || this.utils.isEmpty(this.username.trim())){
      this.snackBar.open("User Name is required.", "close", {duration: AppConstant.SNACKBAR_TIMEOUT,});
      return false;
    }
    if(this.password == undefined || this.utils.isEmpty(this.password.trim())){
      this.snackBar.open("Password is required.", "close", {duration: AppConstant.SNACKBAR_TIMEOUT,});
      return false;
    }
    return true;
  }

  loginWithEnterKey(event) {
    if (event.keyCode == 13) {
      if (this.username != undefined && this.username != "" && this.password != undefined && this.password != "") {
        this.login();
      }
    }
  }
 
}
