"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "Satchel Bag",
        price: 9999.99,
        description:
          "Satchel bags, also named as Cambridge satchel, refers to a kind of handbags with horizontally rectangle shape",
        manufacturer: "Gucci",
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Messenger Bag",
        price: 12999.99,
        description:
          "Messenger bags have a rectangular form with a long strap, worn over the shoulder or across the body",
        manufacturer: "Louis Vuitton",
        stock: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Briefcase",
        price: 29999.99,
        description:
          "Briefcases are characterized by narrow shapes and hard sides",
        manufacturer: "LV",
        stock: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
