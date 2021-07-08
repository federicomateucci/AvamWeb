const fs = require("fs");
const path = "./dataForMysql.json";
const sqlServices = require("../controllers/Product");

function extraerDatos() {
   console.log("antes de require");
   const xlsx = require("xlsx");
   console.log("dps del require");
   try {
      const wb = xlsx.readFile("./upload/AVAMCAR.XLS");
      console.log("dps de readFile");
      const ws = wb.Sheets["Sheet1"];
      const data = xlsx.utils.sheet_to_json(ws);
      return data;
   } catch (error) {
      console.log(error);
   }
}

async function actualizar(datanew) {
   data.array.forEach((element) => {
      console.log(element);
      sqlServices.update(element);
   });
   console.log(actualizado);
}
//  function writeFileJsonForMysql(data){
//      const newData = [];
//      data.forEach(element => {

//              let objeto ={
//                  productoid : element.codigo,
//                  descripcion : element.descrip,
//                  venta : element.venta,
//                  auto : element.auto,
//                  lista : element.lista,
//              }
//              newData.push(objeto)

//      });
//      console.log('Escribiendo Archivo json');
//      const jsondata = JSON.stringify(newData)
//      fs.writeFileSync('./dataForMysql.json',jsondata);
//     console.log('Archivo Json Escrito y Actualizado.');
//      console.log(newData);

//      return newData
//  }
//  const data = extraerDatos();

//  const dataFinal = writeFileJsonForMysql(data);

module.exports = { extraerDatos, actualizar };
