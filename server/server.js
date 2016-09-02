var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var db = require("./db");

module.exports = function(port, githubAuthoriser, url) {
    var app = express();
    app.use("/", express.static(__dirname + "/../public"));
    app.use("/lib", express.static(__dirname + "/../node_modules"));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(require("./controllers"));
    var auth = require("./controllers/auth");
    auth.setGithubAuthoriser(githubAuthoriser);

    // Connect to db
    if (url) {
        db.connect(url, function(err) {
            if (err) {
                console.log("Unable to connect to Mongo.");
                process.exit(1);
            }
        });
    }

    return app.listen(port);
};
