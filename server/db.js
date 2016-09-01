var MongoClient = require('mongodb').MongoClient
var masterUrl = process.env.DB_URI ||
"mongodb://test:test@ds027491.mongolab.com:27491/chat-grad-project";
var url;

var state = {
  db: null,
}

exports.connect = function(url, done) {

    if (state.db) return done();

    this.url = url;
    MongoClient.connect(masterUrl, function(err, db) {
        console.log("Connecting to database: chat-grad-project");
        if (err) {
            return done(err);
        }
      db.collection("users").find().toArray(function(err, docs) {
          db.close(function() {
              console.log("Connection Closed");
              MongoClient.connect(url, function(err, ddb) {
                  console.log("Connecting to database: chat-grad-project-dave");
                  if (err) {
                      return done(err);
                  }
                  ddb.dropCollection("users", function(err, result) {
                      console.log("Dropping collection 'users'");
                      if (err) {
                          return done(err);
                      }
                      ddb.collection("users").insert(docs, {w: 1}, function(err, result) {
                          console.log("Inserting users into database");
                          if (err) {
                              return done(err);
                          }
                          state.db = ddb;
                          done();
                      });
                  });
              });
          });
      });
  });
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}
