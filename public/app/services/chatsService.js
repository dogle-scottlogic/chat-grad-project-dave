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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var ChatsService = (function () {
    function ChatsService(http) {
        this.http = http;
        this.chatList = [];
        this.chatsUrl = "/api/chats";
        this.handleChatAdded = function (chat, res) {
            if (res.status === 201) {
                this.chatList.push(chat);
            }
        };
        this.extractChats = function (res) {
            if (res.status === 200) {
                var chats = res.json();
                console.log(chats);
                for (var _i = 0, chats_1 = chats; _i < chats_1.length; _i++) {
                    var chat = chats_1[_i];
                    console.log(chat);
                    this.chatList.push(this.createChat(chat));
                }
            }
        };
    }
    // Get
    ChatsService.prototype.getChats = function () {
        var _this = this;
        this.http.get(this.chatsUrl)
            .toPromise()
            .then(function (response) { return _this.extractChats(response); })
            .catch(this.handleError);
    };
    // Post
    ChatsService.prototype.addChat = function (chat) {
        var _this = this;
        this.http
            .post(this.chatsUrl, JSON.stringify(chat), { headers: new http_1.Headers({ "Content-Type": "application/json" }) })
            .toPromise()
            .then(function (res) { return _this.handleChatAdded(chat, res); })
            .catch(this.handleError);
    };
    ChatsService.prototype.handleError = function (error) {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    };
    ChatsService.prototype.createChat = function (chat) {
        var newChat = new app_chat_entity_1.Chat();
        newChat._id = chat.id;
        newChat.chatFromId = chat.chatFromId;
        newChat.chatToId = chat.chatToId;
        newChat.chatToName = chat.chatToName;
        newChat.chatName = chat.chatName;
        newChat.lastSpoke = new Date(chat.lastSpoke);
        return newChat;
    };
    ChatsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ChatsService);
    return ChatsService;
}());
exports.ChatsService = ChatsService;
//# sourceMappingURL=chatsService.js.map