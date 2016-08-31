import { Chat } from "../entities/app.chat.entity";
import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ChatsService {

    public chatList: Chat[] = [];
    private chatsUrl = "/api/chats";
    private handleChatAdded = function(chat: Chat, res: Response): void {
        if(res.status === 201) {
            this.chatList.push(chat);
        }
    };
    private extractChats = function(res: Response): void {
        if(res.status === 200) {
            let chats = res.json();
            console.log(chats);
            for(var chat of chats) {
                console.log(chat);
                this.chatList.push(this.createChat(chat));
            }
        }
    };

    constructor(private http: Http) {
    }

    // Get
    public getChats(): void {
        this.http.get(this.chatsUrl)
               .toPromise()
               .then(response => this.extractChats(response))
               .catch(this.handleError);
    }

    // Post
    public addChat(chat: Chat): void {
        this.http
             .post(this.chatsUrl, JSON.stringify(chat), {headers: new Headers({"Content-Type": "application/json"})})
             .toPromise()
             .then(res => this.handleChatAdded(chat, res))
             .catch(this.handleError);
}

     private handleError(error: any): Promise<any> {
         console.error("An error occurred", error);
         return Promise.reject(error.message || error);
     }

     private createChat(chat): Chat {
         let newChat = new Chat();
         newChat._id = chat.id;
         newChat.chatFromId = chat.chatFromId;
         newChat.chatToId = chat.chatToId;
         newChat.chatToName = chat.chatToName;
         newChat.chatName = chat.chatName;
         newChat.lastSpoke = new Date(chat.lastSpoke);
         return newChat;
     }
}
