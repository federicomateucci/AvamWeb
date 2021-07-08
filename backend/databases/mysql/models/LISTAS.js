"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class listaAutos extends Model {
      static associate(models) {}
   }
   listaAutos.init(
      {
         LI: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
         TITULO: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "listaAutos",
         timestamps: false, // quitamos created At, Updated At
      }
   );
   return listaAutos;
};
