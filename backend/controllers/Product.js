const productoSql = require("../databases/mysql/models").produsql;
const db = require("../databases/mysql/models/index");
const querys = require("../databases/mysql/querys");

// Query para productos por auto?


// Get de los productos con el join de autos
async function getTrueTableProducts() {
   let trueList = await db.dbAvamcar.query(querys.queryAllProducts, { type: db.dbAvamcar.QueryTypes.SELECT });
   return trueList;
}

// Get de todos los productos
async function getAll() {
   const products = await productoSql.findAll();
   return products;
}

async function create(product) {
   const resultado = await productoSql.create({
      productoid: product.productoid,
      descripcion: product.descripcion,
      venta: product.venta,
      auto: product.auto,
      lista: product.lista,
   });
   return resultado;
}

async function update(product) {
   const commandResult = await productoSql.update(
      {
         descripcion: product.descrip,
         venta: product.venta,
         /* auto: product.auto,
         lista: product.lista, */
      },
      { returning: true, where: { productoid: product.codigo } }
   );
}

async function removeById(id) {
   await productoSql.destroy({
      where: {
         productoId: id,
      },
   });
   return id;
}

async function getById(id) {
   const product = await productoSql.findByPk(id);
   return product;
}

module.exports = {
   getAll,
   create,
   update,
   removeById,
   getById,
   getTrueTableProducts
   
};
