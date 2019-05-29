import { Utils } from './../../../utility-module/Utils';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteConstants } from 'utility-module/Constants';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  password1;
  password2;
  @ViewChild('passwordInput') passwordInput:ElementRef;

  constructor(private activeRoute: ActivatedRoute, 
    private utils: Utils,private router: Router) { }

  ngOnInit() {
    let url = this.activeRoute.snapshot.params.url;
    if(!this.utils.isEmpty(url)){
      
    }else{
      this.router.navigate([RouteConstants.PAGE_NOT_FOUND]);
    }

  }

}
