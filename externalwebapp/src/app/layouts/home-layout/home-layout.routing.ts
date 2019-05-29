import { RegisterComponent } from './../../register/register.component';
import { LoginComponent } from './../../login/login.component';
import { Routes } from '@angular/router';

export const HomeLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register',component: RegisterComponent},
];
