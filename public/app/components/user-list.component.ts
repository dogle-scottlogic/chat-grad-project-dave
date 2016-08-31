import { User } from "../entities/app.user.entity";
import { UsersService } from "../services/usersService";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "my-users",
  styleUrls: ["css/users.css"],
  templateUrl: "app/templates/userList.html",
})

export class UserListComponent implements OnInit {
    @Input() public user: User;
    private users: User[] = [];
    private loginUri: string;
    private selectedUser: User;

    constructor(private usersService: UsersService) {
    }

    public getUsers(): void {
        this.usersService
            .getUsers()
            .then( result => this.users = result);
    }

    public ngOnInit(): void {
        this.getUsers();
    }

    public onUserSelect(user: User): void {
        this.selectedUser = user;
    }
}
