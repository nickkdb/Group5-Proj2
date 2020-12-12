module.exports = function(sequelize, DataTypes) {
    var playlist_song = sequelize.define("playlist_song", {

    });
  
    playlist_song.associate = function(models) {
        playlist_song.belongsTo(models.playlist, {
          foreignKey: {
            allowNull: false
          }
        });
      };
  
    playlist_song.associate = function(models) {
        playlist_song.belongsTo(models.song, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return playlist_song;
  };
  