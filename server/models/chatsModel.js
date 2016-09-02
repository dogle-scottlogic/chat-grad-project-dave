var db = require("../db");

// Get all chats
exports.all = function(cb) {
    var chats = db.get().collection("chats");
    chats.find().toArray(function(err, docs) {
        if (!err) {
            cb(null, docs.map(function(chat) {
                return {
                    _id: chat._id,
                    chatFromId: chat.chatFromId,
                    chatToId: chat.chatToId,
                    chatToName: chat.chatToName,
                    chatName: chat.chatName,
                    lastSpoke: chat.lastSpoke,
                    name: chat.name,
                };
            }));
        } else {
            cb(err, null);
        }
    });
};

// Add a new chat
exports.add = function(chat, cb) {
    console.log(chat);
    var chats = db.get().collection("chats");
    try {
        chats.insert(chat, {w: 1}, function(err, result) {
            console.log("Got to callback");
            if (err) {
                cb(err, null);
            } else {
                cb(null, chat._id);
            }
        });
    } catch (e) {
        console.log(e);
    }
};
