var server = require("../server/server");
var db = require("../server/db");
var request = require("request");
var assert = require("chai").assert;
var sinon = require("sinon");

var testPort = 52684;
var baseUrl = "http://localhost:" + testPort;
var oauthClientId = "1234clientId";

var testUser = {
    _id: "bob",
    name: "Bob Bilson",
    avatarUrl: "http://avatar.url.com/u=test"
};
var testChat = {
    chatFromId: "dogle-scottlogic",
    lastSpoke: "2016-09-02T07:04:14.406Z",
    _id: "453b74fe-7059-11e6-8b77-86f30ca893d3",
    chatToId: "new-user1",
    chatToName: "person-1",
    chatName: "my chat 1",
};
var testChat2 = {
    _id: "4b0077b8-7059-11e6-8b77-86f30ca893d3",
    chatFromId: "dogle-scottlogic",
    chatToId: "new-user2",
    chatToName: "person-2",
    chatName: "my chat 2",
    lastSpoke: "2016-09-02T07:04:14.406Z",
};
var testGithubUser = {
    login: "bob",
    name: "Bob Bilson",
    avatar_url: "http://avatar.url.com/u=test"
};
var testToken = "123123";
var testExpiredToken = "987978";

describe("chats", function() {
    var cookieJar;
    var mockDb;
    var githubAuthoriser;
    var serverInstance;
    var dbCollections;
    beforeEach(function() {
        cookieJar = request.jar();
        dbCollections = {
            users: {
                find: sinon.stub(),
                findOne: sinon.stub(),
                insertOne: sinon.spy()
            },
            chats: {
                find: sinon.stub(),
                findOne: sinon.stub(),
                insertOne: sinon.spy()
            },
        };
        mockDb = {
            collection: sinon.stub()
        };
        mockDb.collection.withArgs("users").returns(dbCollections.users);
        mockDb.collection.withArgs("chats").returns(dbCollections.chats);
        db.set(mockDb);
        githubAuthoriser = {
            authorise: function() {},
            oAuthUri: "https://github.com/login/oauth/authorize?client_id=" + oauthClientId
        };

        serverInstance = server(testPort, githubAuthoriser);
    });
    afterEach(function() {
        serverInstance.close();
    });
    function authenticateUser(user, token, callback) {
        sinon.stub(githubAuthoriser, "authorise", function(req, authCallback) {
            authCallback(user, token);
        });

        dbCollections.users.findOne.callsArgWith(1, null, user);

        request(baseUrl + "/oauth", function(error, response) {
            cookieJar.setCookie(request.cookie("sessionToken=" + token), baseUrl);
            callback();
        });
    }

    describe("GET /api/chats", function() {
        var requestUrl = baseUrl + "/api/chats";
        var allChats;
        beforeEach(function() {
            allChats = {
                toArray: sinon.stub()
            };
            dbCollections.chats.find.returns(allChats);
        });
        it("responds with status code 401 if user not authenticated", function(done) {
            request(requestUrl, function(error, response) {
                assert.equal(response.statusCode, 401);
                done();
            });
        });
        it("responds with status code 401 if user has an unrecognised session token", function(done) {
            cookieJar.setCookie(request.cookie("sessionToken=" + testExpiredToken), baseUrl);
            request({url: requestUrl, jar: cookieJar}, function(error, response) {
                assert.equal(response.statusCode, 401);
                done();
            });
        });
        it("responds with status code 200 if user is authenticated", function(done) {
            authenticateUser(testUser, testToken, function() {
                allChats.toArray.callsArgWith(0, null, [testUser]);

                request({url: requestUrl, jar: cookieJar}, function(error, response) {
                    assert.equal(response.statusCode, 200);
                    done();
                });
            });
        });
        it("responds with a body that is a JSON representation of the chats if user is authenticated", function(done) {
            authenticateUser(testUser, testToken, function() {
                allChats.toArray.callsArgWith(0, null, [
                        testChat,
                        testChat2
                    ]);
                request({url: requestUrl, jar: cookieJar}, function(error, response, body) {
                    assert.deepEqual(JSON.parse(body), [
                        {
                            _id: "453b74fe-7059-11e6-8b77-86f30ca893d3",
                            chatFromId: "dogle-scottlogic",
                            chatToId: "new-user1",
                            chatToName: "person-1",
                            chatName: "my chat 2",
                            lastSpoke: "2016-09-02T07:04:14.406Z",
                        },
                        {
                            _id: "4b0077b8-7059-11e6-8b77-86f30ca893d3",
                            chatFromId: "dogle-scottlogic",
                            chatToId: "new-user2",
                            chatToName: "person-2",
                            chatName: "my chat 2",
                            lastSpoke: "2016-09-02T07:04:14.406Z",
                        }
                    ]);
                    done();
                });
            });
        });
        it("responds with status code 500 if database error", function(done) {
            authenticateUser(testUser, testToken, function() {
                allChats.toArray.callsArgWith(0, {err: "Database failure"}, null);

                request({url: requestUrl, jar: cookieJar}, function(error, response) {
                    assert.equal(response.statusCode, 500);
                    done();
                });
            });
        });
    });
    describe("POST /api/chats", function() {
        var requestUrl = baseUrl + "/api/chats";
        var allChats;
        beforeEach(function() {
            allChats = {
                toArray: sinon.stub()
            };
            dbCollections.chats.find.returns(allChats);
        });
        it("responds with status code 401 if user not authenticated", function(done) {
            request.post({
                headers: {"content-type" : "application/json"},
                url: requestUrl,
                body: JSON.stringify(testChat),
            }, function(error, response, body) {
                assert.equal(response.statusCode, 401);
                done();
            });
        });
        it("responds with status code 401 if user has an unrecognised session token", function(done) {
            cookieJar.setCookie(request.cookie("sessionToken=" + testExpiredToken), baseUrl);
            request.post({
                headers: {"content-type" : "application/json"},
                url: requestUrl,
                jar: cookieJar,
                body: JSON.stringify(testChat),
            }, function(error, response) {
                assert.equal(response.statusCode, 401);
                done();
            });
        });
        it.only("responds with status code 201 if user is authenticated", function(done) {
            authenticateUser(testUser, testToken, function() {

                request.post({
                    headers: {"content-type" : "application/json"},
                    url: requestUrl,
                    jar: cookieJar,
                    body: JSON.stringify(testChat)
                }, function(error, response) {
                    assert(dbCollections.chats.insertOne.calledOnce);
                    assert.equal(response.statusCode, 201);
                    done();
                });
            });
        });/*
        it("responds with a body that is a JSON representation of the user if user is authenticated", function(done) {
            authenticateUser(testUser, testToken, function() {
                allUsers.toArray.callsArgWith(0, null, [
                        testUser,
                        testUser2
                    ]);

                request({url: requestUrl, jar: cookieJar}, function(error, response, body) {
                    assert.deepEqual(JSON.parse(body), [
                        {
                            _id: "bob",
                            name: "Bob Bilson",
                            avatarUrl: "http://avatar.url.com/u=test"
                        },
                        {
                            _id: "charlie",
                            name: "Charlie Colinson",
                            avatarUrl: "http://avatar.url.com/u=charlie_colinson"
                        }
                    ]);
                    done();
                });
            });
        });
        it("responds with status code 500 if database error", function(done) {
            authenticateUser(testUser, testToken, function() {
                allUsers.toArray.callsArgWith(0, {err: "Database failure"}, null);

                request({url: requestUrl, jar: cookieJar}, function(error, response) {
                    assert.equal(response.statusCode, 500);
                    done();
                });
            });
        });*/
    });
});
