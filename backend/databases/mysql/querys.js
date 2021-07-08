
const queryAllProducts = 'SELECT produsqls.productoid,produsqls.descripcion,CONVERT(produsqls.venta*1.22,DECIMAL(9,2)) AS precio,listamarcas.NOMBRE AS auto,listaautos.TITULO AS marca FROM produsqls INNER JOIN listamarcas ON produsqls.auto = listamarcas.CODIGO INNER JOIN listaautos ON produsqls.lista = listaautos.LI'

module.exports ={
    queryAllProducts
}

// Poner todas las querys en un array de objetos