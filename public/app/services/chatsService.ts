import { Chat } from "../entities/app.chat.entity";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ChatsService {

    public chatList: Chat[] = [];
}
