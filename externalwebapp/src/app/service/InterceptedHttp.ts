import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from './AuthenticationService';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import {tap} from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

@Injectable()
export class InterceptedHttp implements HttpInterceptor {
  constructor(private router: Router,
    private authenticationService : AuthenticationService,
    private snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtReq = request.clone();
    // Pass on the cloned request instead of the original request.
    return next.handle(jwtReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const accessToken = event.headers.get('X-Auth');
          if (accessToken) {
            this.authenticationService.setToken(accessToken);
          }
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          let message = 'Could not process the request. Please try again.';
          if (err.error && err.error['errorMessages'] && err.error['errorMessages'].length > 0) {
            this.snackBar.open(err.error['errorMessages'], "close", {duration: 2000,});
          } else if (err.status !== 450) {
            message = err.error['message'] ? err.error['message'] : message;
            this.snackBar.open(message, "close", {duration: 2000,});
          }
          if (err.status === 401) {
            this.authenticationService.logout();
          }
        }
      })
    );
  }
}
