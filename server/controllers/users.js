var express = require('express'),
router = express.Router(),
um = require('../models/userModel'),
auth = require('../middleware/auth');

router.get("/user", auth, function(req, res) {
    um.find(req.session.user, function(err, result) {
        if(err) {
            res.sendStatus(500);
        }
        else {
            res.json(result);
        }
    });
});

router.get("/", auth, function(req, res) {
    um.all(function(err, result) {
        if(err) {
            res.sendStatus(500);
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;
