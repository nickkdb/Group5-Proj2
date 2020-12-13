var db = require("../models");

module.exports = function(app) {
  // get all playlists  
  app.get("/api/playlists", function(req, res) {
    db.playlist.findAll({}).then(function(dbPlaylist) {
      res.json(dbPlaylist);
    });
  });

  // get a specific playlist, include author and all its songs
  app.get("/api/playlists/:id", function(req, res) {
    db.playlist.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: db.song
      },
      {
        model: db.user
      }]
    }).then(function(dbPlaylist) {
      res.json(dbPlaylist);
    });
  });

  // create a new playlist
  app.post("/api/playlists", function(req, res) {
    db.playlist.create(req.body).then(function(dbPlaylist) {
      res.json(dbPlaylist);
    });
  });

    // create a new song and add to playlist_songs
    app.post("/api/songs", function(req, res) {
      db.song.create(req.body).then(function(dbSong) {

        // subsequently associate the new song to its playlist
        let ps = {songId: dbSong.id, playlistId: req.body.playlistId}
        db.playlist_song.create(ps)
      });
    });


  // update an existing playlist
  app.put("/api/playlists", function(req, res) {
    db.playlist.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPlaylist) {
      res.json(dbPlaylist);
    });
  });

  // delete an existing playlist
  app.delete("/api/playlists/:id", function(req, res) {
    db.playlist.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPlaylist) {
      res.json(dbPlaylist);
    });
  });

};
