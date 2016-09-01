var db = require('../db')

// Get all chats
exports.all = function(cb) {
    var chats = db.get().collection("chats")
    chats.find().toArray(function(err, docs) {
        if (!err) {
            cb(null, docs.map(function(chat) {
                return {
                    id: chat._id,
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
}

// Add a new chat
exports.add = function(chat, cb) {
    db.get().collection("chats").insert(chat, {w: 1}, function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, chat._id);
        }
    });
}
