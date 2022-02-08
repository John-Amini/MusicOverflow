'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    songUrl: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.hasMany(models.Comment,{foreignKey:'songId',onDelete: 'CASCADE',hooks:true})
    Song.belongsTo(models.Album,{foreignKey:'albumId'})
    //figure out the library association for this and song
    // Song.belongsTo(models.Library,{foreignKey:'songId'})
    Song.belongsTo(models.User,{ foreignKey: 'userId' })
  };
  return Song;
};
