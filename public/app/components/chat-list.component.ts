import { Chat } from "../entities/app.chat.entity";
import { ChatsService } from "../services/chatsService";
import { Component } from "@angular/core";
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: "chat-list",
  styleUrls: ["css/chat-list.css"],
  templateUrl: "app/templates/chatList.html",
})
export class ChatListComponent {
    private chats: Chat[];
    private selectedChat: Chat;
    private subscription:Subscription;

    constructor(private chatsService: ChatsService) {}


    public onChatSelect(chat: Chat): void {
        this.selectedChat = chat;
    }
}
