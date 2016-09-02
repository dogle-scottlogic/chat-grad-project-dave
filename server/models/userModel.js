var db = require("../db");

// Add a new user
exports.add = function(user, cb) {
    var users = db.get().collection("users");
    users.insertOne(user, {w: 1}, function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, user._id);
        }
    });
};

// Get a particular user
exports.find = function(id, cb) {
    var users = db.get().collection("users");
    users.findOne({
        _id: id
    }, function(err, user) {
        cb(err, user);
    });
};

// Get all users
exports.all = function(cb) {
    var users = db.get().collection("users");
    users.find().toArray(function(err, docs) {
        if (!err) {
            cb(null, docs.map(function(user) {
                return {
                    _id: user._id,
                    name: user.name,
                    avatarUrl: user.avatarUrl
                };
            }));
        } else {
            cb(err, null);
        }
    });
};
