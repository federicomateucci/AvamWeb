'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('listaprecios', {
      productoid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      venta: {
        type: Sequelize.INTEGER
      },
      auto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lista: {
        type: Sequelize.STRING,
        allowNull: false
      }
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('listaprecios');
  }
};