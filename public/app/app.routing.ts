import { UserListComponent }      from "./components/user-list.component";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "Users",
    },
    {
        component: UserListComponent,
        path: "Users",
    },
];

export const routing = RouterModule.forRoot(appRoutes);
