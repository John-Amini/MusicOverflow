'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Comments',[
        {userId:1,songId:5,body:"Great Song",createdAt:new Date(),updatedAt:new Date()},
        {userId:1,songId:6,body:"Good Song",createdAt:new Date(),updatedAt:new Date()},
        {userId:1,songId:7,body:"love the vibes",createdAt:new Date(),updatedAt:new Date()},
        {userId:2,songId:1,body:"brings back memories",createdAt:new Date(),updatedAt:new Date()},
        {userId:2,songId:2,body:"Makes me happy",createdAt:new Date(),updatedAt:new Date()},
        {userId:3,songId:4,body:"I feel so relaxed when I listen to this",createdAt:new Date(),updatedAt:new Date()},
        {userId:3,songId:6,body:"Thanks for this!",createdAt:new Date(),updatedAt:new Date()},
        {userId:3,songId:5,body:"Appreciate the post!",createdAt:new Date(),updatedAt:new Date()},
        {userId:2,songId:7,body:"WOW",createdAt:new Date(),updatedAt:new Date()},
        {userId:1,songId:8,body:"I don't like this one",createdAt:new Date(),updatedAt:new Date()}
      ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
