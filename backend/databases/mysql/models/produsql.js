"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class produSql extends Model {
      static associate(models) {}
   }
   produSql.init(
      {
         productoid: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
         descripcion: DataTypes.STRING,

         venta: DataTypes.DECIMAL(10, 2),
         auto: { type: DataTypes.STRING, foreingKey: true },
         lista: { type: DataTypes.STRING, foreingKey: true },
      },
      {
         sequelize,
         modelName: "produsql",
         timestamps: false, // quitamos created At, Updated At
      }
   );
   return produSql;
};
