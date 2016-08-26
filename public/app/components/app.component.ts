import { User } from "../entities/app.user.entity";
import { UsersService } from "../services/usersService";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "app/templates/userList.html",
})

export class AppComponent implements OnInit {
    private loggedIn = false;
    private users: User[] = [];
    private user: User = new User();
    private loginUri = "Test";

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

    private logIn(user: any) {
        this.loggedIn = true;
        this.user = user;
        this.getUsers();
    }
}
