import { routing }        from "../app.routing";
import { AppComponent }  from "../components/app.component";
import { ChatListComponent } from "../components/chat-list.component";
import { UserDetailComponent } from "../components/user-detail.component";
import { UserListComponent } from "../components/user-list.component";
import { ChatsService }  from "../services/chatsService";
import { UsersService }  from "../services/usersService";
import { NgModule }      from "@angular/core";
import { FormsModule }   from "@angular/forms";
import { HttpModule }     from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  bootstrap:    [ AppComponent ],
  declarations: [
      AppComponent,
      ChatListComponent,
      UserDetailComponent,
      UserListComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing,
  ],
  providers: [UsersService, ChatsService],
})
export class AppModule { }
