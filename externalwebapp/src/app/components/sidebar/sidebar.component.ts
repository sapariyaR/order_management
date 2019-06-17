import { AuthenticationService } from './../../service/AuthenticationService';
import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/admin/user-management', title: 'User Management',  icon:'person', class: '' },
    { path: '/admin/customers', title: 'Customers',  icon:'business', class: '' },
    { path: '/admin/order', title: 'Orders',  icon:'shopping_basket', class: '' },
    {path: '/admin/order-history', title: 'Orders History',  icon:'history', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  user;
  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.user = this.authenticationService.getUser();
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  
}
