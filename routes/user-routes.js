var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.user.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

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


  app.post("/api/users", function(req, res) {
    db.user.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

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
