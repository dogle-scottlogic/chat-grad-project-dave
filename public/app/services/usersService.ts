import { User } from "../entities/app.user.entity";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class UsersService {

    private usersUrl = "/api/users";
    private userUrl = "/api/users/user";
    private loginUrl = "/oauth/uri";

    constructor(private http: Http) { }

    // Get
    public getUsers(): Promise<User[]> {
        return this.http.get(this.usersUrl)
               .toPromise()
               .then(response => this.extractData(response))
               .catch(this.handleError);
    }

    public getUser(): Promise<User> {
        return this.http.get(this.userUrl)
               .toPromise()
               .then(response => this.extractData(response))
               .catch(this.handleError);
    }

    public getLoginUri(): Promise<any> {
        return this.http.get(this.loginUrl)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
    }

    private extractData(res: Response) {
      let body = res.json();
      return body || { };
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}
