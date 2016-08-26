"use strict";
var user_list_component_1 = require("./components/user-list.component");
var router_1 = require("@angular/router");
var appRoutes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "Users",
    },
    {
        component: user_list_component_1.UserListComponent,
        path: "Users",
    },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map