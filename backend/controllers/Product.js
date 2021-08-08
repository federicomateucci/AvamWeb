const productoSql = require("../databases/mysql/models").produsql;
const db = require("../databases/mysql/models/index");
const querys = require("../databases/mysql/querys");

// Query para productos por auto?
async function getTrueTableProductsByCar(car) {
   const trueList = await db.dbAvamcar.query(
      `select AVAMCARLISTA.produsqls.productoid,AVAMCARLISTA.produsqls.descripcion,CONVERT(produsqls.venta*1.22,DECIMAL(9,2)) AS
    precio,AVAMCARLISTA.listamarcas.NOMBRE as auto ,AVAMCARLISTA.listaautos.TITULO as marca FROM AVAMCARLISTA.produsqls INNER JOIN AVAMCARLISTA.listamarcas ON 
    AVAMCARLISTA.produsqls.auto = AVAMCARLISTA.listamarcas.CODIGO INNER JOIN AVAMCARLISTA.listaautos ON AVAMCARLISTA.produsqls.lista = AVAMCARLISTA.listaautos.LI 
     `,
      { type: db.dbAvamcar.QueryTypes.SELECT }
   );
   console.log(trueList);
   return trueList;
}

// Query para productos por marca?
async function getTrueTableProductsByBrand(brand) {
   const trueList = await db.dbAvamcar.query(
      `select AVAMCARLISTA.produsqls.productoid,AVAMCARLISTA.produsqls.descripcion,CONVERT(produsqls.venta*1.22,DECIMAL(9,2)) AS
    precio,AVAMCARLISTA.listamarcas.NOMBRE as auto ,AVAMCARLISTA.listaautos.TITULO as marca FROM AVAMCARLISTA.produsqls INNER JOIN AVAMCARLISTA.listamarcas ON 
    AVAMCARLISTA.produsqls.auto = AVAMCARLISTA.listamarcas.CODIGO INNER JOIN AVAMCARLISTA.listaautos ON AVAMCARLISTA.produsqls.lista = AVAMCARLISTA.listaautos.LI 
    WHERE AVAMCARLISTA.listaautos.TITULO like '${brand}' `,
      { type: db.dbAvamcar.QueryTypes.SELECT }
   );
   console.log(trueList);
   return trueList;
}

// Query para productos por auto y marca?
async function getTrueTableProductsByCarAndBrand(car, brand) {
   const trueList = await db.dbAvamcar.query(
      `select AVAMCARLISTA.produsqls.productoid,AVAMCARLISTA.produsqls.descripcion,CONVERT(produsqls.venta*1.22,DECIMAL(9,2)) AS
    precio,AVAMCARLISTA.listamarcas.NOMBRE as auto ,AVAMCARLISTA.listaautos.TITULO as marca FROM AVAMCARLISTA.produsqls INNER JOIN AVAMCARLISTA.listamarcas ON 
    AVAMCARLISTA.produsqls.auto = AVAMCARLISTA.listamarcas.CODIGO INNER JOIN AVAMCARLISTA.listaautos ON AVAMCARLISTA.produsqls.lista = AVAMCARLISTA.listaautos.LI 
    WHERE AVAMCARLISTA.listaautos.TITULO like '${brand}' and AVAMCARLISTA.listamarcas.NOMBRE like '${car}'`,
      { type: db.dbAvamcar.QueryTypes.SELECT }
   );
   console.log(trueList);
   return trueList;
}

// Query para productos por auto y precio maximo?
async function getTrueTableProductsByCarAndPriceMaxOfArg(car, price) {
   const trueList = await db.dbAvamcar.query(
      `select AVAMCARLISTA.produsqls.productoid,AVAMCARLISTA.produsqls.descripcion,CONVERT(produsqls.venta*1.22,DECIMAL(9,2)) AS
   precio,AVAMCARLISTA.listamarcas.NOMBRE as auto ,AVAMCARLISTA.listaautos.TITULO as marca FROM AVAMCARLISTA.produsqls INNER JOIN AVAMCARLISTA.listamarcas ON 
   AVAMCARLISTA.produsqls.auto = AVAMCARLISTA.listamarcas.CODIGO INNER JOIN AVAMCARLISTA.listaautos ON AVAMCARLISTA.produsqls.lista = AVAMCARLISTA.listaautos.LI 
   WHERE CONVERT(produsqls.venta*1.22,DECIMAL(9,2)) <= '${price}' and listamarcas.NOMBRE like '${car}'`,
      { type: db.dbAvamcar.QueryTypes.SELECT }
   );
   console.log(trueList);
   return trueList;
}

// Query para productos por marca y precio maximo?
async function getTrueTableProductsByBrandAndPriceMaxOfArg(brand, price) {
   const trueList = await db.dbAvamcar.query(
      `select AVAMCARLISTA.produsqls.productoid,AVAMCARLISTA.produsqls.descripcion,CONVERT(produsqls.venta*1.22,DECIMAL(9,2)) AS
   precio,AVAMCARLISTA.listamarcas.NOMBRE as auto ,AVAMCARLISTA.listaautos.TITULO as marca FROM AVAMCARLISTA.produsqls INNER JOIN AVAMCARLISTA.listamarcas ON 
   AVAMCARLISTA.produsqls.auto = AVAMCARLISTA.listamarcas.CODIGO INNER JOIN AVAMCARLISTA.listaautos ON AVAMCARLISTA.produsqls.lista = AVAMCARLISTA.listaautos.LI 
   WHERE CONVERT(produsqls.venta*1.22,DECIMAL(9,2)) <= '${price}' and listaautos.TITULO like '${brand}'`,
      { type: db.dbAvamcar.QueryTypes.SELECT }
   );
   console.log(trueList);
   return trueList;
}

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
   getTrueTableProductsByBrandAndPriceMaxOfArg,
   getAll,
   create,
   update,
   removeById,
   getById,
   getTrueTableProducts,
   getTrueTableProductsByCarAndBrand,
   getTrueTableProductsByBrand,
   getTrueTableProductsByCar,
   getTrueTableProductsByCarAndPriceMaxOfArg,
};
