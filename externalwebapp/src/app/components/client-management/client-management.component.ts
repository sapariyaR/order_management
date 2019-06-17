import { APIConstant, AppConstant } from './../../../utility-module/Constants';
import { APIManager } from './../../service/ApiManagerService';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit ,ViewChild, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

const ELEMENT_DATA: Client[] = [];

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.scss']
})
export class ClientManagementComponent implements OnInit {

  clientCountDetails;
  displayedColumns: string[] = ['position', 'name', 'email', 'degreeOfPriority','comment','weChat','action'];
  dataSource = new MatTableDataSource<Client>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedDataSet;

  constructor(public dialog: MatDialog,
    public aPIManager : APIManager,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadClientDetails();
    this.loadAllClient(null);
    
  }

  loadClientDetails(){
    this.aPIManager.getAPI(APIConstant.CLIENT_COUNT_DETAILS, {},{}, this.aPIManager.HttpOptions_4, false, true).subscribe(response => {
      if (response != undefined && response != null) {
        this.clientCountDetails = response;
      }
    });
  }

  loadAllClient(proirity){
   let obj = {};
   if(proirity != undefined && proirity != null && proirity != ''){
     obj['priority'] = proirity;
     this.selectedDataSet = proirity;
   }else{
    obj['priority'] = '';
    this.selectedDataSet = null;
   }

    this.aPIManager.getAPI(APIConstant.GET_ALL_CLIENT, obj,{}, this.aPIManager.HttpOptions_4, false, true).subscribe(response => {
      if (response != undefined && response != null) {
        response.forEach(function (item, index) {
          item['position'] = index+1;
        });
        this.dataSource = new MatTableDataSource<Client>(response);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddClientComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != null && result != ''){
        console.log(`Dialog result: ${result}`);
        if(this.selectedDataSet == null){
          delete result.action;
          result['position'] = this.dataSource.data.length + 1;
          const data = this.dataSource.data;
          data.push(result);
          this.dataSource.data = data;
        }else{
          if(this.selectedDataSet == 'HIGH' && result.degreeOfPriority == 'HIGH'){
            delete result.action;
            result['position'] = this.dataSource.data.length + 1;
            const data = this.dataSource.data;
            data.push(result);
            this.dataSource.data = data;
          }else if(this.selectedDataSet == 'MEDIUM' && result.degreeOfPriority == 'MEDIUM'){
            delete result.action;
            result['position'] = this.dataSource.data.length + 1;
            const data = this.dataSource.data;
            data.push(result);
            this.dataSource.data = data;
          }else if(this.selectedDataSet == 'LOW' && result.degreeOfPriority == 'LOW'){
            delete result.action;
            result['position'] = this.dataSource.data.length + 1;
            const data = this.dataSource.data;
            data.push(result);
            this.dataSource.data = data;
          }
        }
      }
      this.loadClientDetails();
    });
  }

  editClient(client){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = client;
    const dialogRef = this.dialog.open(AddClientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != null && result != ''){
          delete result.action;
          const data = this.dataSource.data;
          data[result.position - 1] = result;
          this.dataSource.data = data;
      }
      this.loadClientDetails();
    });
  }

  deleteClient(client){
    if (confirm("Are you sure you want to permanently delete this Client?")) {
      this.aPIManager.deleteAPI(APIConstant.DELETE_CLIENT+client.id, {}, this.aPIManager.HttpOptions, false, true).subscribe(response => {
        const data = this.dataSource.data;
        data.splice(client.position-1,1);
        if(data.length > 0){
          data.forEach(function (item, index) {
            item['position'] = index+1;
          });
        }
        this.dataSource.data = data;
        this.snackBar.open("Client deleted successfully", "close", { duration: AppConstant.SNACKBAR_TIMEOUT, });
        this.loadClientDetails();
      });
    }
  }

  wrapTextTitle(title: String, limit: number): String {
    if (title.length > limit) {
        return title.substring(0, limit) + "...";
    }
    return title;
}

}

export interface Client {
  position: number;
  id:number;
  name:string;
  email:string;
  degreeOfPriority:string;
  comment:string;
  weChat:string;
}

@Component({
  selector: 'add-client-dialog',
  templateUrl: 'add-client.component.html',
})
export class AddClientComponent {
  clientOldObject = null;

  nameFormControl = new FormControl('', [Validators.required,Validators.maxLength(30)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  priorityFormControl = new FormControl('', Validators.required);
  commentFormControl = new FormControl('');
  communicationFormControl = new FormControl('');

  constructor(private dialogRef:MatDialogRef<AddClientComponent>,
    private aPIManager : APIManager,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data){
      if(data != null){
        this.clientOldObject = data;
        this.nameFormControl.setValue(data.name);
        this.email.setValue(data.email);
        this.priorityFormControl.setValue(data.degreeOfPriority);
        this.commentFormControl.setValue(data.comment);
        this.communicationFormControl.setValue(data.weChat);
      }else{
        this.clientOldObject = null;
      }
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :'';
  }
  getErrorMessageName(){
    return this.nameFormControl.hasError('required') ? 'You must enter a value' :
      this.nameFormControl.hasError('maxlength') ? 'You have more than 30 characters' : '';
  }

  saveClient(){
    let userObj = {"email":this.email.value, "name":this.nameFormControl.value, "degreeOfPriority":this.priorityFormControl.value,
          "comment":this.commentFormControl.value,"weChat":this.communicationFormControl.value};
      if(this.clientOldObject != null){
        userObj["id"] = this.clientOldObject.id;
      }

      this.aPIManager.postAPI(APIConstant.CREATE_CLIENT, userObj, this.aPIManager.HttpOptions, false, true).subscribe(response => {
        if (response != undefined && response != null) {
          if(this.clientOldObject != null){
            response["position"] = this.clientOldObject.position;
            response["action"] = "update";
            this.snackBar.open("Client updated successfully", "close", { duration: AppConstant.SNACKBAR_TIMEOUT });
          }else{
            response["action"] = "add";
            this.snackBar.open("Clinet created successfully", "close", { duration: AppConstant.SNACKBAR_TIMEOUT });
          }
          this.dialogRef.close(response);
        }
      });
  }
}
