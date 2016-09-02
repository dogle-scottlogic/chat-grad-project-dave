var express = require("express");
var router = express.Router();
var um = require("../models/userModel");
var auth = require("../middleware/auth");

router.get("/user", auth, function(req, res) {
    um.find(req.session.user, function(err, result) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.json(result);
        }
    });
});

router.get("/", auth, function(req, res) {
    um.all(function(err, result) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;
