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
    private loggedIn: boolean;
    private users: User[] = [];
    private loginUri: string;
    private selectedUser: User;

    constructor(private usersService: UsersService) {
        this.loggedIn = false;
    }

    public getUsers(): void {
        this.usersService
            .getUsers()
            .then( result => this.users = result);
    }

    public getUser(): void {
        this.usersService
        .getUser()
        .then( result => this.logIn(result), result => this.getLoginUri());
    }

    public getLoginUri(): void {
        this.usersService
        .getLoginUri()
        .then( result => this.loginUri = result.uri );
    }

    public ngOnInit(): void {
        this.getUser();
    }

    public onUserSelect(user: User): void {
        this.selectedUser = user;
    }

    private logIn(user: any) {
        this.loggedIn = true;
        this.user = user;
        this.getUsers();
    }
}
