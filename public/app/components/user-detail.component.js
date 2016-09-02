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
var app_chat_entity_1 = require("../entities/app.chat.entity");
var app_user_entity_1 = require("../entities/app.user.entity");
var chatsService_1 = require("../services/chatsService");
var core_1 = require("@angular/core");
var angular2_uuid_1 = require("angular2-uuid");
var UserDetailComponent = (function () {
    function UserDetailComponent(chatsService) {
        this.chatsService = chatsService;
    }
    UserDetailComponent.prototype.add = function (user) {
        var chat = new app_chat_entity_1.Chat();
        chat._id = angular2_uuid_1.UUID.UUID();
        chat.chatToId = user._id;
        chat.chatToName = user.name;
        chat.chatName = "New Chat";
        this.chatsService.addChat(chat);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', app_user_entity_1.User)
    ], UserDetailComponent.prototype, "user", void 0);
    UserDetailComponent = __decorate([
        core_1.Component({
            selector: "my-user-detail",
            styleUrls: ["css/users-detail.css"],
            templateUrl: "app/templates/user-detail.html",
        }), 
        __metadata('design:paramtypes', [chatsService_1.ChatsService])
    ], UserDetailComponent);
    return UserDetailComponent;
}());
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map