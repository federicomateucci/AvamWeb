const express = require("express");
const router = express.Router();
const productsController = require("../controllers/Product");
const verificarAdminRol = require("../middlewares/verificarAdminRol");
const excel = require("../util/excelToJson");

// LISTAS COMPLETAS
// Get lista completa para mostrar a clientes, con el join para mostrar el nombre de auto
router.get("/listaCompleta", async (req, res) => {
   const data = await productsController.getTrueTableProducts();
   data.forEach(element => {
      element.isActive = false;
   });
   console.log(data);
   res.json(data);
});

// Get lista completa para que admin modifique o vea....
router.get("/", async (req, res) => {
   try {
      const data = await productsController.getAll();
      console.log(data);
      res.json(data);
   } catch (err) {
      res.status(500).send(`Error en getAll() MYSQL`);
   }
});

router.get("/findByAny", async (req, res) => {
   const carToFind = req.body.car;
   const brandToFind = req.body.brand;
   const priceToSearch = req.body.price;
   // if (brandToFind && carToFind) {
   //    const data = await productsController.getTrueTableProductsByCarAndBrand(carToFind, brandToFind);
   //    res.json(data);
   // }
   if (brandToFind === "" && carToFind && priceToSearch === "") {
      const data = await productsController.getTrueTableProductsByCar(carToFind);
      res.json(data);
   } else if (carToFind === "" && brandToFind && priceToSearch === "") {
      const data = await productsController.getTrueTableProductsByBrand(brandToFind);
      res.json(data);
   } else if (carToFind && priceToSearch && brandToFind === "") {
      const data = await productsController.getTrueTableProductsByCarAndPriceMaxOfArg(carToFind, priceToSearch);
      res.json(data);
   } else if (carToFind === "" && priceToSearch && brandToFind) {
      const data = await productsController.getTrueTableProductsByBrandAndPriceMaxOfArg(brandToFind, priceToSearch);
      res.json(data);
   } else {
      const data = await productsController.getTrueTableProducts();
      res.json(data);
   }
   console.log(req.body);
});

// GET | Producto por ID
router.get("/:id", async (req, res) => {
   const productId = req.params.id;
   const data = await productsController.getById(productId);
   if (data) {
      res.json(data);
   } else {
      res.status(404).send("NOT FOUND");
   }
});

// POST | Agregar un producto
router.post("/", verificarAdminRol, async (req, res) => {
   const product = req.body;
   try {
      const result = await productsController.create(product);

      res.status(201).send("El producto se agrego a productos");
      console.log(result);
   } catch (error) {
      res.status(500).send(error.name);
   }
});

// PUT | Update de producto
router.put("/:id", verificarAdminRol, async (req, res) => {
   const product = req.body;
   try {
      product.productoId = req.params.id;
      const result = await productsController.update(product);
      res.json(result);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// DELETE | Eliminacion de producto
router.delete("/:id", verificarAdminRol, async (req, res) => {
   try {
      const result = await productsController.removeById(req.params.id);
      res.json({ mensaje: "Se elimino el producto con ID: " + result });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// POST | Upload de archivo
router.post("/upload-avatar", async (req, res) => {
   try {
      if (!req.files) {
         res.send({
            status: false,
            message: "No file uploaded",
         });
      } else {
         //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
         // sample = name of inputlabel in html or Postman for tests
         let avatar = req.files.sample;

         //Use the mv() method to place the file in upload directory (i.e. "uploads")
         await avatar.mv("./UpLoad/" + avatar.name);
         //send response
         const data = excel.extraerDatos();

         for (let index = 0; index < data.length; index++) {
            const element = data[index];
            productsController.update(element);
         }

         res.send({
            status: true,
            message: "File is uploaded",
            data: {
               name: avatar.name,
               mimetype: avatar.mimetype,
               size: avatar.size,
            },
         });
      }
   } catch (err) {
      res.status(500).send(err);
   }
});

module.exports = router;
