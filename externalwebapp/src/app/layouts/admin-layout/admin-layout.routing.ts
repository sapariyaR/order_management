import { OrderHistoryComponent } from './../../components/order-history/order-history.component';
import { OrderManagementComponent } from './../../components/order-management/order-management.component';
import { ClientManagementComponent } from './../../components/client-management/client-management.component';
import { Routes } from '@angular/router';
import { UserManagementComponent } from './../../components/user-management/user-management.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path:'user-management', component: UserManagementComponent},
    {path:'customers', component: ClientManagementComponent},
    {path:'order',component:OrderManagementComponent},
    {path:'order-history',component:OrderHistoryComponent}
];
