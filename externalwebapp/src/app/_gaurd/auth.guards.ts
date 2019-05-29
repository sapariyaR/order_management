import { AuthenticationService } from './../service/AuthenticationService';
import { RouteConstants } from '../../utility-module/Constants';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService : AuthenticationService) {
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let activateRoute = true;
    const readURL = state.url.split('?')[0];
    if (this.authenticationService.isLoggedIn()) {
      activateRoute = true;
    } else {
      if (readURL === '/') {
        activateRoute = true;
      } else {
        this.router.navigate(['/' + RouteConstants.LOGIN_ROUTE]);
        activateRoute = false;
      }
    }
    return activateRoute;
  }
}
