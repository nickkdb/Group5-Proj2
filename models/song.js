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
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
    });
  
    song.associate = function(models) {
        song.belongsTo(models.playlist, {
          foreignKey: {
            allowNull: false
          }
        });
      };
  
    return song;
  };
  