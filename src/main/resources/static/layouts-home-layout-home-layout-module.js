(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-home-layout-home-layout-module"],{

/***/ "./src/app/layouts/home-layout/home-layout.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/layouts/home-layout/home-layout.module.ts ***!
  \***********************************************************/
/*! exports provided: HomeLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeLayoutModule", function() { return HomeLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _home_layout_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home-layout.routing */ "./src/app/layouts/home-layout/home-layout.routing.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var app_register_register_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var app_login_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/login/login.component */ "./src/app/login/login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var HomeLayoutModule = /** @class */ (function () {
    function HomeLayoutModule() {
    }
    HomeLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_home_layout_routing__WEBPACK_IMPORTED_MODULE_4__["HomeLayoutRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTooltipModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
            ],
            declarations: [
                app_login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"],
                app_register_register_component__WEBPACK_IMPORTED_MODULE_6__["RegisterComponent"]
            ]
        })
    ], HomeLayoutModule);
    return HomeLayoutModule;
}());



/***/ }),

/***/ "./src/app/layouts/home-layout/home-layout.routing.ts":
/*!************************************************************!*\
  !*** ./src/app/layouts/home-layout/home-layout.routing.ts ***!
  \************************************************************/
/*! exports provided: HomeLayoutRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeLayoutRoutes", function() { return HomeLayoutRoutes; });
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../login/login.component */ "./src/app/login/login.component.ts");


var HomeLayoutRoutes = [
    { path: 'home/login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"] },
    { path: 'home/register', component: _register_register_component__WEBPACK_IMPORTED_MODULE_0__["RegisterComponent"] },
];


/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto\" style=\"margin-top: 10%;\">\n        <form class=\"form\" method=\"\" action=\"\">\n          <div class=\"card card-login\">\n            <div class=\"card-header card-header-primary text-center\">\n              <h4 class=\"card-title\">Login</h4>\n            </div>\n            <div class=\"card-body \">\n              <p class=\"card-description text-center\">Welcome to App Name</p>\n              <div class=\"row\">\n                <span class=\"bmd-form-group col-12\">\n                  <div class=\"input-group\">\n                    <mat-form-field class=\"col-12\">\n                      <input matInput placeholder=\"Email\" type=\"email\">\n                    </mat-form-field>\n                  </div>\n                </span>\n              </div>\n              <div class=\"row\">\n                <span class=\"bmd-form-group col-12\">\n                  <div class=\"input-group\">\n                    <mat-form-field class=\"col-12\">\n                      <input matInput placeholder=\"Password\" type=\"password\">\n                    </mat-form-field>\n                  </div>\n                </span>\n              </div>\n            </div>\n            <div class=\"card-footer justify-content-center\">\n                <button mat-raised-button type=\"submit\" class=\"btn btn-primary pull-right\">Lets Go</button>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(router) {
        this.router = router;
        this.emailFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email,
        ]);
        this.passwordFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/register/register.component.html":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-10 ml-auto mr-auto\" style=\"margin-top: 10%\">\n        <div class=\"card card-signup\">\n          <h2 class=\"card-title text-center\">Register</h2>\n          <div class=\"card-body\">\n            <div class=\"row\">\n              <div class=\"col-md-5 ml-auto\">\n                <div class=\"info info-horizontal\">\n                  <div class=\"icon icon-primary\">\n                    <i class=\"material-icons\">timeline</i>\n                  </div>\n                  <div class=\"description\">\n                    <h4 class=\"info-title\">Marketing</h4>\n                    <p class=\"description\">\n                      We've created the marketing campaign of the website. It was a very interesting collaboration.\n                    </p>\n                  </div>\n                </div>\n                <div class=\"info info-horizontal\">\n                  <div class=\"icon icon-primary\">\n                    <i class=\"material-icons\">code</i>\n                  </div>\n                  <div class=\"description\">\n                    <h4 class=\"info-title\">Fully Coded in HTML5</h4>\n                    <p class=\"description\">\n                      We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub.\n                    </p>\n                  </div>\n                </div>\n                <div class=\"info info-horizontal\">\n                  <div class=\"icon icon-info\">\n                    <i class=\"material-icons\">group</i>\n                  </div>\n                  <div class=\"description\">\n                    <h4 class=\"info-title\">Built Audience</h4>\n                    <p class=\"description\">\n                      There is also a Fully Customizable CMS Admin Dashboard for this product.\n                    </p>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-md-5 mr-auto\">\n                  <form>\n                      <div class=\"row\">\n                         \n                          <div class=\"col-md-12\">\n                              <mat-form-field class=\"example-full-width\">\n                                <input matInput placeholder=\"Email address\" type=\"email\">\n                              </mat-form-field>\n                          </div>\n                      </div>\n                      <div class=\"row\">\n                          <div class=\"col-md-6\">\n                            <mat-form-field class=\"example-full-width\">\n                              <input matInput placeholder=\"Fist Name\" type=\"text\">\n                            </mat-form-field>\n                          </div>\n                          <div class=\"col-md-6\">\n                            <mat-form-field class=\"example-full-width\">\n                              <input matInput placeholder=\"Last Name\" type=\"text\">\n                            </mat-form-field>\n                          </div>\n                      </div>\n                      <div class=\"row\">\n                          <div class=\"col-md-12\">\n                            <mat-form-field class=\"example-full-width\">\n                              <input matInput placeholder=\"Adress\" type=\"text\">\n                            </mat-form-field>\n                          </div>\n                      </div>\n                      <div class=\"row\">\n                          <div class=\"col-md-4\">\n                            <mat-form-field class=\"example-full-width\">\n                              <input matInput placeholder=\"City\" type=\"text\">\n                            </mat-form-field>\n                          </div>\n                          <div class=\"col-md-4\">\n                            <mat-form-field class=\"example-full-width\">\n                              <input matInput placeholder=\"Country\" type=\"text\">\n                            </mat-form-field>\n                          </div>\n                          <div class=\"col-md-4\">\n                            <mat-form-field class=\"example-full-width\">\n                              <input matInput placeholder=\"Postal Code\" type=\"text\">\n                            </mat-form-field>\n                          </div>\n                      </div>\n                      <div class=\"row\">\n                          <div class=\"col-md-12\">\n                            <label>About Me</label>\n                            <mat-form-field class=\"example-full-width\">\n                               <textarea matInput placeholder=\"Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.\"></textarea>\n                             </mat-form-field>\n                          </div>\n                      </div>\n                      <button mat-raised-button type=\"submit\" class=\"btn btn-danger pull-right\">Register</button>\n                      <div class=\"clearfix\"></div>\n                  </form>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/register/register.component.scss":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/register/register.component.ts":
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RegisterComponent = /** @class */ (function () {
    function RegisterComponent() {
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.scss */ "./src/app/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ })

}]);
//# sourceMappingURL=layouts-home-layout-home-layout-module.js.map