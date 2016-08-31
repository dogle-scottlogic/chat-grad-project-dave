var server = require("./server/server");
var oAuthGithub = require("./server/oauth-github");
var MongoClient = require("mongodb").MongoClient;

var port = process.env.PORT || 8080;
var dbUri = process.env.DB_URI || "mongodb://test:test@ds027491.mongolab.com:27491/chat-grad-project";
var dogleDbUri = process.env.DB_URI || "mongodb://dogle:UssStargazer2893@ds015740.mlab.com:15740/chat-grad-project-dave";
var oauthClientId = process.env.OAUTH_CLIENT_ID || "fa4a22095c46dfc1d832";
var oauthSecret = process.env.OAUTH_SECRET || "4bbf1b48173c3cbc35917fad9f94ef2b584cbaa4";

MongoClient.connect(dbUri, function(err, db) {
    console.log("Connecting to database: chat-grad-project")
    if (err) {
        console.log("Failed to connect to master db", err);
        return;
    }
    db.collection("users").find().toArray(function(err, docs) {
        db.close(function() {
            console.log("Connection Closed");
            MongoClient.connect(dogleDbUri, function(err, ddb) {
                console.log("Connecting to database: chat-grad-project-dave")
                if (err) {
                    console.log("Failed to connect to db", err);
                    return;
                }
                var githubAuthoriser = oAuthGithub(oauthClientId, oauthSecret);
                ddb.dropCollection("users", function(err, result) {
                    console.log("Dropping collection 'users'");
                    if(err) {
                        console.log("Failed to drop users collection", err);
                    }
                    ddb.collection("users").insert(docs, {w:1}, function(err, result) {
                        console.log("Inserting users into database");
                        if(err) {
                            console.log("Error fetching users", err);
                            return;
                        }
                        server(port, ddb, githubAuthoriser);
                        console.log("Server running on port " + port);
                    });
                });
            });
        });
    });
});
