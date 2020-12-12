module.exports = function(sequelize, DataTypes) {
    var playlist = sequelize.define("playlist", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          }
    });
  
    playlist.associate = function(models) {
        song.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };
  
    return playlist;
  };
  