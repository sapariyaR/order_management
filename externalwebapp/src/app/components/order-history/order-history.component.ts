import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { APIConstant } from './../../../utility-module/Constants';
import { APIManager } from './../../service/ApiManagerService';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orderFilterFG: FormGroup;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'productName', 'orderStatus', 'clientName','creationDateString','endDateString','itemDetails','paymentType','paymentStatus'];

  constructor(private fb: FormBuilder,public aPIManager : APIManager) { 
    this.orderFilterFG = this.fb.group({
      startDate :  new FormControl('', Validators.required),
      endDate :  new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.aPIManager.getAPI(APIConstant.GET_ALL_ORDER_HISTORY, {},{}, this.aPIManager.HttpOptions_4, false, true).subscribe(response => {
      if (response != undefined && response != null) {
        response.forEach(function (item, index) {
          item['position'] = index+1;
        });
        this.dataSource = new MatTableDataSource<any>(response);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  wrapTextTitle(title: String, limit: number): String {
    if (title.length > limit) {
        return title.substring(0, limit) + "...";
    }
    return title;
}

}

