"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("abcabcA123", salt);

    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Rida",
        lastName: "Ahmad",
        email: "rida@gmail.com",
        password: hashedPassword,
        contact: "1234567890",
        gender: "female",
        country: "Pakistan",
        otp: null,
        otpExpiration: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Users");
  },
};
