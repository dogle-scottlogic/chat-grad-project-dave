import { User } from "../entities/app.user.entity";
import { Component, Input } from "@angular/core";

@Component({
  selector: "my-user-detail",
  styleUrls: ["css/users-detail.css"],
  templateUrl: "app/templates/user-detail.html",
})

export class UserDetailComponent {
    @Input()
    public user: User;
}
