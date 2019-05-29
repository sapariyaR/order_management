import { VerifyUserComponent } from './../../components/verify-user/verify-user.component';
import { RegisterComponent } from './../../register/register.component';
import { LoginComponent } from './../../login/login.component';
import { Routes } from '@angular/router';
import { IndexComponent } from 'app/components/index/index.component';

export const HomeLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register',component: RegisterComponent},
    { path: 'index',component: IndexComponent}
];
