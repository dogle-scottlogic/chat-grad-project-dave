import { User } from "../entities/app.user.entity";
import { UsersService } from "../services/usersService";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "my-app",
  styleUrls: ["css/login.css"],
  templateUrl: "app/templates/login.html",
})
export class AppComponent implements OnInit {
    private loggedIn: boolean;
    private user: User = new User();
    private loginUri: string;

    constructor(private usersService: UsersService) {
        this.loggedIn = false;
    }

    public ngOnInit(): void {
        this.getUser();
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

    private logIn(user: any) {
        this.loggedIn = true;
        this.user = user;
    }
}
