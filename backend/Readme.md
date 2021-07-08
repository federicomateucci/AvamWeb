
GET todos los productos con JOINS de las 3 tablas :
RUTA =/productos




CRUD PRODUCTOS:

 -GET todos los productoS (VER TODOS LOS PRODUCTOS):
 /productos/listaCompleta 
 ---------------------
 -GET producto por ID , RUTA = '/productos/id
 
 --------
 -POST - Agregar un producto nuevo:
 
 Enviar con este esquema en la ruta'/productos:

 {
      "productoid": "product.productoid",
      "descripcion": "product.descripcion",
      "venta": "product.venta",
      "auto": "product.auto",
      "lista": "product.lista"
}


-POST - Subir Archivo XLS :

Enviar en la ruta 'products/upload-avatar ;



------

-PUT Actualizar un producto: 
 Enviar con este esquema en la ruta'/productos/id:

 {
      
      descripcion: product.descripcion,
      venta: product.venta,
      auto: product.auto,
      lista: product.lista
}

-------
-DELETE Borrar un producto: 

 Enviar por la ruta el id que del producto que se quiere eliminar'/productos/id:



------

LOGIN:

Registrarse con este esquema en la ruta '/users/signin':
{
    "username": "xxx",
    "email": "xxx@gmail.com",
    "password": "xxx"
}

Identificarse con este esquema en la ruta '/users/login':
{
    "email": "xxx@gmail.com",
    "password": "xxx"
}

Una vez logeado, el body del response les va a dar un json con el siguiente esquema
{
    "autorizacion": true,
    "token": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
    "mensaje": "Sesión iniciada"
}

Para poder acceder a rutas protegidas como '/inventors' hay que ingresar el token.

En el postman, en los headers del request agregar:
- Authorization como key
- Bearer + <token> como valor

Con eso el token ya esta ingresado y se podran ver/editar/borrar los inventores

El archivo TP2-Desafio-2.postman_collection.json tiene los ejemplos de request de todas las operaciones disponibles.
- Para eso deberá ir a postman e hacer import de esta collection.


-CONFIGURACION MYSQL EN ARCHIVO .ENV = 

DB_USERNAME=xxxxx
DB_PASSWORD=xxxxx
DB_HOST=localhost
DB_DATABASE=xxxxxx
DB_DIALECT=mysql