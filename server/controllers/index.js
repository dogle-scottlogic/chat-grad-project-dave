const router = require('express').Router();
const users = require("./users");
const chats = require("./chats");
const auth = require("./auth");

router.use('/api/users', users);
router.use('/api/chats', chats);
router.use("/oauth", auth.router);

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;
