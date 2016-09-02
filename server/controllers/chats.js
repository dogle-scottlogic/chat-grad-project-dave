var express = require("express");
var router = express.Router();
var cm = require("../models/chatsModel");
var auth = require("../middleware/auth");

router.post("/", auth, function(req, res) {
    cm.add(req.body, function(err, result) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.set("Id", result);
            res.set("Location", "/api/todo/" + result);
            res.sendStatus(201);

        }
    });
});

router.get("/", auth, function(req, res) {
    cm.all(function(err, result) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;
