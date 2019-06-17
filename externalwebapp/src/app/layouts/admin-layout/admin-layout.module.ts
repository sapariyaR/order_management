import { OrderHistoryComponent } from './../../components/order-history/order-history.component';
import { DateFormat } from './../../service/data-formater';
import { OrderManagementComponent, AddOrderComponent, ClientOrOrderBottomSheetComponent } from './../../components/order-management/order-management.component';
import { ClientManagementComponent, AddClientComponent } from './../../components/client-management/client-management.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserManagementComponent, AddUserComponent } from './../../components/user-management/user-management.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { MatButtonModule, MatInputModule, MatRippleModule, MatFormFieldModule, MatTooltipModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatChipsModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, DateAdapter, MatBottomSheetModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { VerticalTimelineModule } from 'angular-vertical-timeline';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    DragDropModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    VerticalTimelineModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UserManagementComponent,
    AddUserComponent,
    ClientManagementComponent,
    AddClientComponent,
    OrderManagementComponent,
    AddOrderComponent,
    ClientOrOrderBottomSheetComponent,
    OrderHistoryComponent
  ],
  entryComponents :[AddUserComponent, AddClientComponent, AddOrderComponent,ClientOrOrderBottomSheetComponent],
  providers: [
    { provide: DateAdapter, useClass: DateFormat },
    ]
})

export class AdminLayoutModule {
  constructor(private dateAdapter:DateAdapter<Date>) {
		dateAdapter.setLocale('en-in'); // DD/MM/YYYY
	}
 }
