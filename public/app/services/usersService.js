"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
        this.usersUrl = "/api/users";
        this.userUrl = "/api/user";
        this.loginUrl = "/api/oauth/uri";
    }
    // Get
    UsersService.prototype.getUsers = function () {
        var _this = this;
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(function (response) { return _this.extractData(response); })
            .catch(this.handleError);
    };
    UsersService.prototype.getUser = function () {
        var _this = this;
        return this.http.get(this.userUrl)
            .toPromise()
            .then(function (response) { return _this.extractData(response); })
            .catch(this.handleError);
    };
    UsersService.prototype.getLoginUri = function () {
        return this.http.get(this.loginUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    UsersService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    UsersService.prototype.handleError = function (error) {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    };
    UsersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=usersService.js.map