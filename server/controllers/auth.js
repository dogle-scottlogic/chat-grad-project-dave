var oAuthGithub = require("../oauth-github");
var oauthClientId = process.env.OAUTH_CLIENT_ID || "fa4a22095c46dfc1d832";
var oauthSecret = process.env.OAUTH_SECRET || "4bbf1b48173c3cbc35917fad9f94ef2b584cbaa4";
var githubAuthoriser = oAuthGithub(oauthClientId, oauthSecret);
var express = require('express');
var sessions = {};
var router = express.Router(),
um = require('../models/UserModel'),
auth = require("../middleware/auth");

router.get("/", function(req, res) {
    githubAuthoriser.authorise(req, function(githubUser, token) {
        if (githubUser) {
            um.find(githubUser.login, function(err, user) {
                if (!user) {
                    um.add(user, function(err, result) {
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

module.exports = {sessions: sessions, router: router};
