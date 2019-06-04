import {  MatDialogModule } from '@angular/material/dialog';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './_gaurd/auth.guards';
import { HttpInterceptors } from './service/index-Interceptor';
import { APIManager } from './service/ApiManagerService';
import { AuthenticationService } from './service/AuthenticationService';
import { Utils } from '../utility-module/Utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

import { HeaderComponent } from './header/header.component';
import { MatSnackBarModule, MatInputModule, MatButtonModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatTooltipModule, MatIconModule } from '@angular/material';
import { InterceptedHttp } from './service/InterceptedHttp';
import { HttpClientModule } from '@angular/common/http';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeLayoutComponent,
    HeaderComponent,
    PageNotFoundComponent,
    VerifyUserComponent
  ],
  providers: [Utils,AuthenticationService,InterceptedHttp,APIManager,HttpInterceptors,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
