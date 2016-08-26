import { AppComponent }  from "../components/app.component";
import { UsersService }  from "../services/usersService";
import { NgModule }      from "@angular/core";
import { FormsModule }   from "@angular/forms";
import { HttpModule }     from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  bootstrap:    [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
  ],
  providers: [UsersService],
})
export class AppModule { }
