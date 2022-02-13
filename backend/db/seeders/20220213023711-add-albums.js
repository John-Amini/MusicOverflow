'use strict';

const { query } = require("express");

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
     return queryInterface.bulkInsert('Albums',[
        {userId:2,  title:"test Album",imageUrl: "S2otpG1NGNF93T22fLYsZzmExptk2LKjqrFk2LEFWLJs2xBtiybFiCrFk2LEFWLJsWIKsWTYsQVYsmxYgqxZNixBVgmwBlgwFONsWYANFmADRZgA2xZgA2wYANsWYANsWYANFmADbFmADbFmADRZgA2wYANsWYANBgAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD", createdAt:new Date(),updatedAt:new Date() },
      ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return query.bulkDelete('Albums',null,{});
  }
};
