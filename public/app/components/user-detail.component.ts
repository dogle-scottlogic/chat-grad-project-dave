import { Chat } from "../entities/app.chat.entity";
import { User } from "../entities/app.user.entity";
import { ChatsService } from "../services/chatsService";
import { Component, Input } from "@angular/core";
import { UUID } from "angular2-uuid";

@Component({
  selector: "my-user-detail",
  styleUrls: ["css/users-detail.css"],
  templateUrl: "app/templates/user-detail.html",
})

export class UserDetailComponent {
    @Input() public user: User;

    constructor(private chatsService: ChatsService) {
    }

    public add(user: User) {
        const chat = new Chat();
        chat._id = UUID.UUID();
        chat.chatToId = user._id;
        chat.chatToName = user.name;
        chat.chatName = "New Chat";
        this.chatsService.addChat(chat);
    }
}
