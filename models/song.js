module.exports = function(sequelize, DataTypes) {
    var song = sequelize.define("song", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        album: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
    });

    song.associate = function(models) {
      song.belongsToMany(models.playlist, {as: 'song', through: 'playlist_song', foreignKey: 'songId'});
    };  
      
    return song;
  };
  