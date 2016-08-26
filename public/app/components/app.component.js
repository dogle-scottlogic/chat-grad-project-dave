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
var app_user_entity_1 = require("../entities/app.user.entity");
var usersService_1 = require("../services/usersService");
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent(usersService) {
        this.usersService = usersService;
        this.loggedIn = false;
        this.users = [];
        this.user = new app_user_entity_1.User();
        this.loginUri = "Test";
        this.loggedIn = false;
    }
    AppComponent.prototype.getUsers = function () {
        var _this = this;
        this.usersService
            .getUsers()
            .then(function (result) { return _this.users = result; });
    };
    AppComponent.prototype.getUser = function () {
        var _this = this;
        this.usersService
            .getUser()
            .then(function (result) { return _this.logIn(result); }, function (result) { return _this.getLoginUri(); });
    };
    AppComponent.prototype.getLoginUri = function () {
        var _this = this;
        this.usersService
            .getLoginUri()
            .then(function (result) { return _this.loginUri = result.uri; });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    AppComponent.prototype.logIn = function (user) {
        this.loggedIn = true;
        this.user = user;
        this.getUsers();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app/templates/userList.html",
        }), 
        __metadata('design:paramtypes', [usersService_1.UsersService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map