import { APIConstant, AppConstant } from './../../../utility-module/Constants';
import { APIManager } from './../../service/ApiManagerService';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit ,ViewChild, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'email','gender','role','action'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
    public aPIManager : APIManager,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.aPIManager.getAPI(APIConstant.GET_ALL_USER, {},{}, this.aPIManager.HttpOptions_4, false, true).subscribe(response => {
      if (response != undefined && response != null) {
        response.forEach(function (item, index) {
          item['position'] = index+1;
        });
        this.dataSource = new MatTableDataSource<User>(response);
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != null && result != ''){
        console.log(`Dialog result: ${result}`);
          delete result.action;
          result['position'] = this.dataSource.data.length + 1;
          const data = this.dataSource.data;
          data.push(result);
          this.dataSource.data = data;
      }
    });
  }

  editUser(user){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;
    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != null && result != ''){
          delete result.action;
          const data = this.dataSource.data;
          data[result.position - 1] = result;
          this.dataSource.data = data;
      }
    });
  }

  deleteUser(user){
    if (confirm("Are you sure you want to permanently delete this User?")) {
      this.aPIManager.deleteAPI(APIConstant.DELETE_USER+user.id, {}, this.aPIManager.HttpOptions, false, true).subscribe(response => {
        const data = this.dataSource.data;
        data.splice(user.position-1,1);
        this.dataSource.data = data;
        this.snackBar.open("User deleted successfully", "close", { duration: AppConstant.SNACKBAR_TIMEOUT, });
      });
    }
  }

  sendInvitation(user){
    let obj = {"id":user.id};
    this.aPIManager.getAPI(APIConstant.SEND_INVITATION, obj,{}, this.aPIManager.HttpOptions_4, false, true).subscribe(res =>{});
  }

}

export interface User {
  position: number;
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  role:string;
  gender:string;
}

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'add-user-dialog',
  templateUrl: 'add-user.component.html',
})
export class AddUserComponent {
  userOldObject = null;
  firstNameFormControl = new FormControl('', [Validators.required,Validators.maxLength(15)]);
  lastNameFormControl = new FormControl('', [Validators.required,Validators.maxLength(15)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  roles = new FormControl('', Validators.required);
  genderFormControl = new FormControl('', Validators.required);
  
  rolesList: string[] = ['Admin', 'Sells','Writer','Manager','CEO'];

  constructor(private dialogRef:MatDialogRef<AddUserComponent>,
    private aPIManager : APIManager,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data) {
      if(data != null){
        this.userOldObject = data;
        this.email.setValue(data.email);
        this.roles.setValue(data.role.split(','));
        this.firstNameFormControl.setValue(data.firstName);
        this.lastNameFormControl.setValue(data.lastName);
        this.genderFormControl.setValue(data.gender);
      }else{
        this.userOldObject = null;
      }
   }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :'';
  }
  getErrorMessageFirstName(){
    return this.firstNameFormControl.hasError('required') ? 'You must enter a value' :
      this.firstNameFormControl.hasError('maxlength') ? 'You have more than 15 characters' : '';
  }
  getErrorMessageLast(){
    return this.lastNameFormControl.hasError('required') ? 'You must enter a value' :
      this.lastNameFormControl.hasError('maxlength') ? 'You have more than 15 characters' : '';
  }

  saveUser(){
    let userObj = {"firstName":this.firstNameFormControl.value,
    "lastName":this.lastNameFormControl.value,
    "email":this.email.value,"gender":this.genderFormControl.value,"role":this.roles.value.join(",")};
    if(this.userOldObject != null){
      userObj["id"] = this.userOldObject.id;
    }
    this.aPIManager.postAPI(APIConstant.CREATE_USER, userObj, this.aPIManager.HttpOptions, false, true).subscribe(response => {
      if (response != undefined && response != null) {
        if(this.userOldObject != null){
          response["position"] = this.userOldObject.position;
          response["action"] = "update";
          this.snackBar.open("User updated successfully", "close", { duration: AppConstant.SNACKBAR_TIMEOUT });
        }else{
          response["action"] = "add";
          this.snackBar.open("User created successfully", "close", { duration: AppConstant.SNACKBAR_TIMEOUT });
        }
        this.dialogRef.close(response);
      }
    });
  }

}