"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const config = require("../config/database.js");
const db = {};

let dbAvamcar = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
   .filter((file) => {
      return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
   })
   .forEach((file) => {
      const model = require(path.join(__dirname, file))(dbAvamcar, Sequelize.DataTypes);
      db[model.name] = model;
   });

Object.keys(db).forEach((modelName) => {
   if (db[modelName].associate) {
      db[modelName].associate(db);
   }
});

db.dbAvamcar = dbAvamcar;
db.Sequelize = Sequelize;

// ??? 
db.productSql = require("../models/produsql")(dbAvamcar, Sequelize);

db.LISTAS = require("./listas")(dbAvamcar, Sequelize);
db.AUTOS = require("./auto")(dbAvamcar, Sequelize);

db.LISTAS.hasOne(db.productSql, { foreignKey: "lista" });
db.AUTOS.hasOne(db.productSql, { foreignKey: "auto" });

module.exports = db;
