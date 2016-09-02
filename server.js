var server = require("./server/server");
var oAuthGithub = require("./server/oauth-github");
var oauthClientId = process.env.OAUTH_CLIENT_ID || "fa4a22095c46dfc1d832";
var oauthSecret = process.env.OAUTH_SECRET || "4bbf1b48173c3cbc35917fad9f94ef2b584cbaa4";
var githubAuthoriser = oAuthGithub(oauthClientId, oauthSecret);
var port = process.env.PORT || 8080;
var url = process.env.DB_URI ||
"mongodb://dogle:UssStargazer2893@ds015740.mlab.com:15740/chat-grad-project-dave";

server(port, githubAuthoriser, url);
console.log("Server running on port " + port);
