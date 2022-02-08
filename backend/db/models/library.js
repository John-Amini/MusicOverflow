'use strict';
module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {});
  Library.associate = function(models) {
    // associations can be defined here
    // Library.hasMany(models.User,{foreignKey:'userId'})
    // Library.hasMany(models.Song,{foreignKey:'songId'})
  };
  return Library;
};
