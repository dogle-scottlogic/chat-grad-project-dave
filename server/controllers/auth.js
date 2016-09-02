var express = require("express");
var sessions = {};
var router = express.Router();
var um = require("../models/UserModel");
var auth = require("../middleware/auth");
var githubAuthoriser;
var setGithubAuthoriser = function (authoriser) {
    githubAuthoriser = authoriser;
};

router.get("/", function(req, res) {
    githubAuthoriser.authorise(req, function(githubUser, token) {
        if (githubUser) {
            um.find(githubUser.login, function(err, user) {
                if (!user) {
                    um.add({
                            _id: githubUser.login,
                            name: githubUser.name,
                            avatarUrl: githubUser.avatar_url,
                        }, function(err, result) {
                        if (err) {
                            console.log("Error adding user", err);
                        }
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

router.get("/uri", function(req, res) {
    res.json({
        uri: githubAuthoriser.oAuthUri
    });
});

module.exports = {
    sessions: sessions,
    router: router,
    setGithubAuthoriser: setGithubAuthoriser,
};
