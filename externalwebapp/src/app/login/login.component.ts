import { APIConstant, RouteConstants, AppConstant } from './../../utility-module/Constants';
import { APIManager } from '../service/ApiManagerService';
import { Utils } from '../../utility-module/Utils';
import { AuthenticationService } from './../service/AuthenticationService';
import { Component, OnInit} from '@angular/core';
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
  hide = true;
  emailFormControl = new FormControl('', [Validators.required,Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required,Validators.maxLength(10)]);
  timeZone:string;

  constructor(private router: Router,private auth: AuthenticationService,
    private utils : Utils,private snackBar: MatSnackBar,
    private aPIManager : APIManager) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigate([RouteConstants.DASHBOARD_ROUTE]);
    }
  }

  login() {
    this.auth.logout();
    this.timeZone = new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
    let params = new HttpParams()
      .set('password', this.passwordFormControl.value)
      .set('username', this.emailFormControl.value)
      .set('grant_type', 'password');
    this.aPIManager.postAPI(APIConstant.LOGIN, params.toString(), this.aPIManager.HttpOptions_3, false, true).subscribe(response => {
      if (response != undefined && response != null) {
        let user = {};
        user["id"] = response.id;
        user["first_name"] = response.first_name;
        user["last_name"] = response.last_name;
        user["gender"] = response.gender;
        user["email"] = response.email;
        user["role"] = response.role;
        this.auth.setUser(user);
        this.auth.setToken(response.access_token);
        this.snackBar.open("Login successful", "close", { duration: AppConstant.SNACKBAR_TIMEOUT });
        this.router.navigate([RouteConstants.DASHBOARD_ROUTE]);
      }
    }, error1 => {
      this.snackBar.open(error1.message, "close", { duration: AppConstant.SNACKBAR_TIMEOUT, });
    }
    );
  }

  getErrorMessageEmail() {
    return this.emailFormControl.hasError('required') ? 'You must enter a value' :
        this.emailFormControl.hasError('email') ? 'Not a valid email' :'';
  }

  getPasswordMessageEmail(){
    return this.passwordFormControl.hasError('required') ? 'You must enter a value' :
      this.passwordFormControl.hasError('maxlength') ? 'You have more than 10 characters' : '';
  }
}
