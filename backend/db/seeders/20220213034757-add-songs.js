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
   let image = 'https://player.listenlive.co/templates/StandardPlayerV4/webroot/img/default-cover-art.png';
    return queryInterface.bulkInsert('Songs',[
      {userId:1,albumId:1,title:'Popoi-georgetown-cafe',imageUrl:image,songUrl:'https://musicflowbucket.s3.amazonaws.com/demo%40user.io/Popoi-georgetown-cafe/Popoi-georgetown-cafe.mp3',createdAt:new Date(),updatedAt:new Date()},
      {userId:1,albumId:1,title:'Sunrise',imageUrl:image,songUrl:'https://musicflowbucket.s3.amazonaws.com/demo%40user.io/Sunrise/Sunrise.mp3',createdAt:new Date(),updatedAt:new Date()},
      {userId:1,albumId:1,title:'Sunshine',imageUrl:image,songUrl:'https://musicflowbucket.s3.amazonaws.com/demo%40user.io/Sunshine/Sunshine.mp3',createdAt:new Date(),updatedAt:new Date()},
      {userId:1,albumId:1,title:'Windsouls-Flow',imageUrl:image,songUrl:'https://musicflowbucket.s3.amazonaws.com/demo%40user.io/Windsouls-Flow/Windsouls-Flow.mp3',createdAt:new Date(),updatedAt:new Date()},
      {userId:2,albumId:1,title:'Chillout Lounge',imageUrl:image,songUrl:'https://musicflowbucket.s3.amazonaws.com/user1%40user.io/Chillout+Lounge/Chillout+Lounge.mp3',createdAt:new Date(),updatedAt:new Date()},
      {userId:2,albumId:1,title:'Someday',imageUrl:image,songUrl:'https://musicflowbucket.s3.amazonaws.com/user1%40user.io/Someday/Someday.mp3',createdAt:new Date(),updatedAt:new Date()},
      {userId:3,albumId:1,title:'Happy Days',imageUrl:image,songUrl:'https://musicflowbucket.s3.amazonaws.com/user2%40user.io/Happy+Days/Happy+Days.mp3',createdAt:new Date(),updatedAt:new Date()},
      {userId:3,albumId:1,title:'Tropics',imageUrl:image,songUrl:'https://musicflowbucket.s3.amazonaws.com/user2%40user.io/Tropics/Tropics.mp3',createdAt:new Date(),updatedAt:new Date()},

    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Songs',null,{});
  }
};
