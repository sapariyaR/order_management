import { Router } from '@angular/router';
import { EncryptionFunctions } from './../../utility-module/encryption-functions';
import { AppConstant, RouteConstants } from './../../utility-module/Constants';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {
    private _token = '';
    jwtHelperService: JwtHelperService = new JwtHelperService();
    
    constructor(private router: Router) { }

    isLoggedIn(): boolean {
        return this.IsValidToken(this.getToken()) && this.isValidUser(this.getUser());
    }

    isValidUser(user): boolean {
        return (user) ? true : false;
    }

    IsValidToken(token: string): boolean {
        let isValid = true;
        try {
            const isTokenExpired = this.jwtHelperService.isTokenExpired(this.getToken());
            if (isTokenExpired) {
                isValid = false;
                this.clearSession();
                this.router.navigate([RouteConstants.LOGIN_ROUTE]);
            }
        } catch (e) {
            isValid = false;
        }
        return isValid;
    }

    clearSession() {
        this.setToken(null);
        this.setUser(null);
        localStorage.clear();
    }

    setToken(value: string): void {
        localStorage.setItem(AppConstant.TOKEN, EncryptionFunctions.ENCRYPT_OBJ(value));
        this._token = value;
    }

    getToken(): string {
        this._token = EncryptionFunctions.DECRYPT_OBJ(localStorage.getItem(AppConstant.TOKEN));
        return this._token;
    }

    setUser(user) {
        localStorage.setItem(AppConstant.USER, EncryptionFunctions.ENCRYPT_OBJ(user));
    }

    getUser() {
        let user = EncryptionFunctions.DECRYPT_OBJ(localStorage.getItem(AppConstant.USER));
        return user;
    }

    logout() {
        this.clearSession();
        this.router.navigate([RouteConstants.LOGIN_ROUTE]);
    }
}