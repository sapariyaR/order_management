import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: 'admin',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  }, 
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home/login',
    pathMatch: 'full',
  },{
    path: 'home',
    redirectTo: 'home/login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/home-layout/home-layout.module#HomeLayoutModule'
      }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
