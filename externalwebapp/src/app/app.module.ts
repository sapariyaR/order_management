import { AuthGuard } from './_gaurd/auth.guards';
import { HttpInterceptors } from './service/index-Interceptor';
import { APIManager } from './service/ApiManagerService';
import { AuthenticationService } from './service/AuthenticationService';
import { Utils } from '../utility-module/Utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

import {
  AgmCoreModule
} from '@agm/core';
import { HeaderComponent } from './header/header.component';
import { MatSnackBarModule } from '@angular/material';
import { InterceptedHttp } from './service/InterceptedHttp';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeLayoutComponent,
    HeaderComponent
  ],
  providers: [Utils,AuthenticationService,InterceptedHttp,APIManager,HttpInterceptors,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
