import { Chat } from "../entities/app.chat.entity";
import { User } from "../entities/app.user.entity";
import { ChatsService } from "../services/chatsService";
import { Component, Input } from "@angular/core";

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
        var chat = new Chat();
        chat.id = 1;
        chat.name = "topic";
        chat.contact = user.name;
        chat.lastSpoke = null;
    }
}
