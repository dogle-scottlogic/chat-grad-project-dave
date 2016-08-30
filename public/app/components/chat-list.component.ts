import { Chat } from "../entities/app.chat.entity";
import { ChatsService } from "../services/chatsService";
import { Component } from "@angular/core";

@Component({
  selector: "chat-list",
  styleUrls: ["css/chat-list.css"],
  templateUrl: "app/templates/chatList.html",
})
export class ChatListComponent {
    private chats: Chat[];
    private selectedChat: Chat;

    constructor(private chatsService: ChatsService) {
        this.chats = chatsService.chatList;
    }

    public onChatSelect(chat) {
        console.log(this.chats);
    }
}
