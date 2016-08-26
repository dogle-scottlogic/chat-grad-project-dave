import { routing }        from "../app.routing";
import { AppComponent }  from "../components/app.component";
import { UserDetailComponent } from "../components/user-detail.component";
import { UserListComponent } from "../components/user-list.component";
import { UsersService }  from "../services/usersService";
import { NgModule }      from "@angular/core";
import { FormsModule }   from "@angular/forms";
import { HttpModule }     from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  bootstrap:    [ AppComponent ],
  declarations: [
      AppComponent,
      UserDetailComponent,
      UserListComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing,
  ],
  providers: [UsersService],
})
export class AppModule { }
