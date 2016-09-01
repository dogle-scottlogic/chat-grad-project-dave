var server = require("./server/server");

var port = process.env.PORT || 8080;
var url = process.env.DB_URI ||
"mongodb://dogle:UssStargazer2893@ds015740.mlab.com:15740/chat-grad-project-dave";


server(port, url);
console.log("Server running on port " + port);
