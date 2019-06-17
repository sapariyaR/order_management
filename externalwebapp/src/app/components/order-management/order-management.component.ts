import { Component, OnInit, Inject } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { APIConstant, AppConstant } from './../../../utility-module/Constants';
import { APIManager } from './../../service/ApiManagerService';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';
import {empty} from 'rxjs';
import {debounceTime, switchMap, tap } from 'rxjs/operators';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orderList = [{"submittedList":[]},{"inProgressList":[]},{"holdList":[]},{"completedList":[]},{"reOpenList":[]}];
  connectedTo = ['submittedList','inProgressList','holdList','completedList','reOpenList'];
  constructor(public dialog: MatDialog,
    public aPIManager : APIManager,
    private snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet) {
     
     }

  ngOnInit() {
    this.aPIManager.getAPI(APIConstant.GET_ALL_ORDER, {},{}, this.aPIManager.HttpOptions_4, false, true).subscribe(response => {
      if (response != undefined && response != null && response.length > 0) {
       this.addOrderIntoList(response);
      }
    });
  }

  addOrderIntoList(response){
    response.forEach((item, index) => {
      if(item["orderStatus"] == 'SUBMITTED'){
          this.orderList[0]['submittedList'].push(item);
      }else if(item["orderStatus"] == 'INPROGRESS'){
          this.orderList[1]['inProgressList'].push(item);
      }else if(item["orderStatus"] == 'COMPLETED'){
        this.orderList[3]['completedList'].push(item);
      }else if(item["orderStatus"] == 'HOLD'){
        this.orderList[2]['holdList'].push(item);
      }else if(item["orderStatus"] == 'REOPEN'){
        this.orderList[4]['reOpenList'].push(item);
      }
    });
  }

  openAddOrder(){
    const dialogRef = this.dialog.open(AddOrderComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != null && result != ''){
        this.orderList[0]['submittedList'].unshift(result);
      }
    });
  }

  openClientOrOrderDetailsSheet(order,type:number): void {
    this._bottomSheet.open(ClientOrOrderBottomSheetComponent, {
      panelClass: 'custom-width',
      data: { order :order,"type":type},// 1 = order; 2= client details
    });
  }




  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {//['submittedList','inProgressList','holdList','completedList','reOpenList'];
      let status = "";
      if(event.container.id == 'submittedList'){
        status = "SUBMITTED";
      }else if(event.container.id == 'inProgressList'){
        status = "INPROGRESS";
      }else if(event.container.id == 'holdList'){
        status = "HOLD";
      }else if(event.container.id == 'completedList'){
        status = "COMPLETED";
      }else if(event.container.id == 'reOpenList'){
        status = "REOPEN";
      }
      let orderId = event.previousContainer.data[event.previousIndex].orderId;
      let obj = {"orderId":orderId,"orderStatus":status};
      this.aPIManager.putAPI(APIConstant.UPDATE_ORDER_STATUS,obj, this.aPIManager.HttpOptions_4, false, true).subscribe(response => {
        if (response != undefined && response != null) {
        event.previousContainer.data[event.previousIndex].orderStatus = status;
         transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        }
      });
      
    }
  }

  deleteOrder(order,index){
    if (confirm("Are you sure you want to permanently delete this User?")) {
      this.aPIManager.deleteAPI(APIConstant.DELETE_ORDER+order.orderId, {}, this.aPIManager.HttpOptions, false, true).subscribe(response => {
        if(order.orderStatus == 'SUBMITTED'){
          this.orderList[0]['submittedList'].splice(index,1);
        }else if(order.orderStatus == 'INPROGRESS'){
          this.orderList[1]['inProgressList'].splice(index,1);
        }else if(order.orderStatus == 'HOLD'){
          this.orderList[2]['holdList'].splice(index,1);
        }else if(order.orderStatus == 'COMPLETED'){
          this.orderList[3]['completedList'].splice(index,1);
        }else if(order.orderStatus == 'REOPEN'){
          this.orderList[4]['reOpenList'].splice(index,1);
        }
        this.snackBar.open("Order deleted successfully", "close", { duration: AppConstant.SNACKBAR_TIMEOUT, });
      });
    }
  }

}

@Component({
  selector: 'add-order-dialog',
  templateUrl: 'add-order.component.html',
})
export class AddOrderComponent implements OnInit {
  minDate = new Date();
  filteredUsers = [];
  usersForm: FormGroup;

  constructor(private dialogRef:MatDialogRef<AddOrderComponent>,
    private aPIManager : APIManager,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
      
   }

   
  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: new FormControl('', [Validators.required, RequireMatch]),
      productName : new FormControl('', Validators.required),
      productDescription : new FormControl('', Validators.required),
      numbrOfUnit : new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
      pricePerUnit : new FormControl('', Validators.required),
      totalPrice : new FormControl('', Validators.required),
      paymentType : new FormControl('', Validators.required),
      endDate :  new FormControl('', Validators.required)
    });

    this.usersForm.get('userInput').valueChanges
      .pipe(
        debounceTime(300),
        tap(() => true),
        switchMap((value) => {
          if (value != '' && typeof value != 'object') {
            return this.aPIManager.getAPI(APIConstant.GET_ALL_CLIENT_BY_NAME, { name: value }, {}, this.aPIManager.HttpOptions_4, false, true);
          } else {
            return empty();
          }
        })).subscribe(clients => this.filteredUsers = clients);

    this.usersForm.get('numbrOfUnit').valueChanges.pipe(
      switchMap((value) => {
        if (value != '' && value != null && this.usersForm.get('pricePerUnit').value != '' && this.usersForm.get('pricePerUnit').value != null) {
          let totalPrice = value * this.usersForm.get('pricePerUnit').value;
          this.usersForm.get('totalPrice').setValue(totalPrice);
          return empty();
        } else {
          return empty();
        }
      })).subscribe(clients => "");

    this.usersForm.get('pricePerUnit').valueChanges.pipe(
      switchMap((value) => {
        if (value != '' && value != null && this.usersForm.get('numbrOfUnit').value != '' && this.usersForm.get('numbrOfUnit').value != null) {
          let totalPrice = value * this.usersForm.get('numbrOfUnit').value;
          this.usersForm.get('totalPrice').setValue(totalPrice);
          return empty();
        } else { return empty(); }
      })).subscribe(clients => "");
  }

  displayFn(client) {
    if (client) { return client.name +"( "+client.email+" )"; }
  }
  
  getRequiredErrorMsg(formName){
    return this.usersForm.get(formName).hasError('required') ? 'You must enter a value' : "";
  }

  getNumberOfUnitError(){
    return this.usersForm.get('numbrOfUnit').hasError('required') ? 'You must enter a value' :
    this.usersForm.get('numbrOfUnit').hasError('pattern') ? 'You must enter valid integer number' : '';
  }
  getDateValidationError(){
    return this.usersForm.get('endDate').hasError('required') ? 'You must enter a value' :
    this.usersForm.get('endDate').hasError('matDatepickerMin') ? 'You must enter valid date' : ''
  }
  getClientErrorMsg(){
    return this.usersForm.get('userInput').hasError('required') ? 'You must enter a value' :
    this.usersForm.get('userInput').hasError('incorrect') ? 'Please select a valid Client' : ''
  }

  saveOrder() {
    let endDateString = this.usersForm.get("endDate").value.getDate() + "/" + (this.usersForm.get("endDate").value.getMonth() + 1) + "/" + this.usersForm.get("endDate").value.getFullYear();
    let orderObj = {
      "productName": this.usersForm.get("productName").value, "productDescription": this.usersForm.get("productDescription").value,
      "endDate": endDateString, "numberOfUnit": this.usersForm.get("numbrOfUnit").value,
      "pricePerUnit": this.usersForm.get("pricePerUnit").value, "price": this.usersForm.get("totalPrice").value,
      "paymentType": this.usersForm.get("paymentType").value, 
      "clientId": this.usersForm.get("userInput").value.id,"clientName":this.usersForm.get("userInput").value.name
    };

    this.aPIManager.postAPI(APIConstant.CREATE_ORDER, orderObj, this.aPIManager.HttpOptions, false, true).subscribe(response => {
      if (response != undefined && response != null) {
        this.snackBar.open("Order created successfully", "close", { duration: AppConstant.SNACKBAR_TIMEOUT });
        this.dialogRef.close(response);
      }
    });
  }

}

export function RequireMatch(control: AbstractControl) {
  const selection: any = control.value;
  if (typeof selection === 'string') {
      return { incorrect: true };
  }
  return null;
}

@Component({
  selector: 'client-order-bottom-sheet',
  templateUrl: 'client-order-bottom-sheet.html',
  styleUrls: ['./order-management.component.scss']
})
export class ClientOrOrderBottomSheetComponent {
  order = null;
  eventType = null;
  clientAndOrderCountDetails;
  orderDetails;
  orderTimeLine = [];

  constructor(private _bottomSheetRef: MatBottomSheetRef<ClientOrOrderBottomSheetComponent>,
    private aPIManager : APIManager,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
      this.order = data.order;
      this.eventType = data.type;
      if(data.type == 2){
        let input = {"clientId":this.order.clientId};
        this.aPIManager.getAPI(APIConstant.GET_CLIENT_ORDER_COUNT_DETAILS, input,{}, this.aPIManager.HttpOptions_4, false, true).subscribe(response => {
          if (response != undefined && response != null) {
            this.clientAndOrderCountDetails = response;
          }
        });
      }else if(data.type == 1){
        let input = {"orderId":this.order.orderId};
        this.aPIManager.getAPI(APIConstant.GET_ORDER_BY_ID, input,{}, this.aPIManager.HttpOptions_4, false, true).subscribe(response => {
          if (response != undefined && response != null) {
            this.orderDetails = response;
          }
        });
      }else{
        let input = {"orderId":this.order.orderId};
        this.aPIManager.getAPI(APIConstant.GET_ORDER_TIMELINE, input,{}, this.aPIManager.HttpOptions_4, false, true).subscribe(response => {
          if (response != undefined && response != null && response.length > 0) {
            this.orderTimeLine = response;
          }
        });
      }
    }


    parseDate(dateString){
      return new Date(dateString);
    }

  
}