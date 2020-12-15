var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/join", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/join.html"));
  });

  app.get("/forgot", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/forgot-password.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/account");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/account", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/account.html"));
  });

   app.get("/create", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create-playlist.html"));
  });

  app.get("/test", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test.html"));
  });
  
  // app.get("/account", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/account.html"));
  // });

  // app.get("/create", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/create-playlist.html"));
  // });

  // app.get("/playlist", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/playlist.html"));
  // });

};