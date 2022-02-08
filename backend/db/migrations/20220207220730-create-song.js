'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: { model: "Users" }
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: { model: "Albums" }
      },
      title: {
        type: Sequelize.STRING
      },
      imageUrl: {
        //if null we'll grab albumImage url and if thats null just show a normal static image
        type: Sequelize.STRING(2083),
      },
      songUrl: {
        allowNull:false,
        type: Sequelize.STRING(2083)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Songs');
  }
};
