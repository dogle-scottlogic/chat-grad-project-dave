var auth = require("../controllers/auth");
module.exports = function(req, res, next) {
    if (req.cookies.sessionToken) {
        req.session = auth.sessions[req.cookies.sessionToken];
        if (req.session) {
            next();
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}
