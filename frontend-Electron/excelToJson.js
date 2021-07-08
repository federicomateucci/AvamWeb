function extraerDatos() {
   console.log("antes de require");
   const xlsx = require("xlsx");
   console.log("dps del require");
  try {
     const wb = xlsx.readFile("AVAMCAR.xlsx");
     console.log("dps de readFile");
     const ws = wb.Sheets["Sheet1"];
     const data = xlsx.utils.sheet_to_json(ws);
     return data; 
  } catch (error) {
     console.log(error);
  }

}

extraerDatos();

module.exports = { extraerDatos };
