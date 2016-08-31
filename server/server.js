var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

module.exports = function(port, db, githubAuthoriser) {
    var app = express();
    app.use("/", express.static(__dirname + "/../public"));
    app.use("/lib", express.static(__dirname + "/../node_modules"));

    app.use(cookieParser());
    app.use(bodyParser.json());
    var users = db.collection("users");
    var chats = db.collection("chats");
    var sessions = {};

    app.get("/oauth", function(req, res) {
        githubAuthoriser.authorise(req, function(githubUser, token) {
            if (githubUser) {
                users.findOne({
                    _id: githubUser.login
                }, function(err, user) {
                    if (!user) {
                        // TODO: Wait for this operation to complete
                        users.insertOne({
                            _id: githubUser.login,
                            name: githubUser.name,
                            avatarUrl: githubUser.avatar_url
                        });
                    }
                    sessions[token] = {
                        user: githubUser.login
                    };
                    res.cookie("sessionToken", token);
                    res.header("Location", "/");
                    res.sendStatus(302);
                });
            }
            else {
                res.sendStatus(400);
            }

        });
    });

    app.get("/api/oauth/uri", function(req, res) {
        res.json({
            uri: githubAuthoriser.oAuthUri
        });
    });

    app.use(function(req, res, next) {
        if (req.cookies.sessionToken) {
            req.session = sessions[req.cookies.sessionToken];
            if (req.session) {
                next();
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    });

    app.get("/api/user", function(req, res) {
        users.findOne({
            _id: req.session.user
        }, function(err, user) {
            if (!err) {
                res.json(user);
            } else {
                res.sendStatus(500);
            }
        });
    });

    app.get("/api/users", function(req, res) {
        users.find().toArray(function(err, docs) {
            if (!err) {
                res.json(docs.map(function(user) {
                    return {
                        id: user._id,
                        name: user.name,
                        avatarUrl: user.avatarUrl
                    };
                }));
            } else {
                res.sendStatus(500);
            }
        });
    });

    app.get("/api/chats", function(req, res) {
        chats.find().toArray(function(err, docs) {
            if (!err) {
                res.json(docs.map(function(chat) {
                    return {
                        id: chat._id,
                        chatFromId: chat.chatFromId,
                        chatToId: chat.chatToId,
                        chatToName: chat.chatToName,
                        chatName: chat.chatName,
                        lastSpoke: chat.lastSpoke,
                        name: chat.name,
                    };
                }));
            } else {
                res.sendStatus(500);
            }
        });
    });

    app.post("/api/chats", function(req, res) {
        var chat = req.body;
        db.collection("chats").insert(chat, {w:1}, function(err, result) {
            if(err) {
                res.sendStatus(500);
                return;
            }
            res.set("Id", chat._id);
            res.set("Location", "/api/todo/" + chat._id);
            res.sendStatus(201);
        });
    });

    return app.listen(port);
};
