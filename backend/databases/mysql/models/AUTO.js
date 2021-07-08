"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class listaMarca extends Model {
      static associate(models) {}
   }
   listaMarca.init(
      {
         CODIGO: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
         NOMBRE: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "listaMarca",
         timestamps: false, // quitamos created At, Updated At
      }
   );
   return listaMarca;
};
