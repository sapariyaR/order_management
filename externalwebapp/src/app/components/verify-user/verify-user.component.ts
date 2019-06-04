import { AuthenticationService } from './../../service/AuthenticationService';
import { APIConstant, AppConstant } from './../../../utility-module/Constants';
import { MatSnackBar } from '@angular/material';
import { APIManager } from './../../service/ApiManagerService';
import { Utils } from './../../../utility-module/Utils';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteConstants } from 'utility-module/Constants';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  user;
  conformhide = true;
  passhide = true;
  formGroup: FormGroup;

  constructor(private activeRoute: ActivatedRoute, 
    private utils: Utils,private router: Router,
    private aPIManager : APIManager,
    private snackBar: MatSnackBar, private formBuilder: FormBuilder,
    private authenticationService : AuthenticationService) {
      let url = this.activeRoute.snapshot.params.url;
      if(!this.utils.isEmpty(url)){
        let obj = {"token":url};
        this.aPIManager.getAPI(APIConstant.VALIDATE_TOKEN, obj,{}, this.aPIManager.HttpOptions_4, false, true).subscribe(response => {
          if (response != undefined && response != null) {
            this.user = response;
          }else{
            this.router.navigate([RouteConstants.LOGIN_ROUTE]);
          }
        }, error1 => {
          this.snackBar.open(error1.message, "close", { duration: AppConstant.SNACKBAR_TIMEOUT, });
        }
        );
      }else{
        this.router.navigate([RouteConstants.PAGE_NOT_FOUND]);
      }
    }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(10)]],
      password2: ['', [Validators.required]]
    }, {validator: passwordMatchValidator});
  }

  /* Shorthands for form controls (used from within template) */
  get password() { return this.formGroup.get('password'); }
  get password2() { return this.formGroup.get('password2'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.formGroup.hasError('passwordMismatch'))
      this.password2.setErrors([{'passwordMismatch': true}]);
    else
      this.password2.setErrors(null);
  }

  save(){
    let userObj = {"id":this.user.id,"password":this.formGroup.get('password').value};
    this.aPIManager.postAPI(APIConstant.RESET_PASSWORD, userObj, this.aPIManager.HttpOptions, false, true).subscribe(response => {
     this.authenticationService.clearSession();
    }, error1 => {
      this.snackBar.open(error1.message, "close", { duration: AppConstant.SNACKBAR_TIMEOUT, });
    }
    );
  }


}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('password2').value)
  return null;
  else
  return {passwordMismatch: true};
};
