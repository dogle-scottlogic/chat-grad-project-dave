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
var chatsService_1 = require("../services/chatsService");
var core_1 = require("@angular/core");
var ChatListComponent = (function () {
    function ChatListComponent(chatsService) {
        this.chatsService = chatsService;
    }
    ChatListComponent.prototype.onChatSelect = function (chat) {
        this.selectedChat = chat;
    };
    ChatListComponent = __decorate([
        core_1.Component({
            selector: "chat-list",
            styleUrls: ["css/chat-list.css"],
            templateUrl: "app/templates/chatList.html",
        }), 
        __metadata('design:paramtypes', [chatsService_1.ChatsService])
    ], ChatListComponent);
    return ChatListComponent;
}());
exports.ChatListComponent = ChatListComponent;
//# sourceMappingURL=chat-list.component.js.map