var db = require("../models");

module.exports = function(app) {
  // Get all users -- user for when checking a login
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // grab a specfic user from the db
  app.get("/api/users/:id", function(req, res) {
    db.user.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // grab all the playlists a specific user has
  app.get("/api/users/:id/playlists", function(req, res) {
    db.user.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: db.playlist
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // create a new user
  app.post("/api/users", function(req, res) {
    db.user.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // update an existing user
  app.put("/api/users", function(req, res) {
    db.user.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // delete an existing user
  app.delete("/api/users/:id", function(req, res) {
    db.user.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
