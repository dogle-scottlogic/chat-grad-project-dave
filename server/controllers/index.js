var router = require("express").Router();
var users = require("./users");
var chats = require("./chats");
var auth = require("./auth");

router.use("/api/users", users);
router.use("/api/chats", chats);
router.use("/oauth", auth.router);

router.get("/", function(req, res) {
    res.render("index");
});

module.exports = router;
