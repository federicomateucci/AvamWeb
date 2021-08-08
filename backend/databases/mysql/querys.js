
const queryAllProducts = 'SELECT produsqls.productoid,produsqls.descripcion,CONVERT(produsqls.venta*1.22,DECIMAL(9,2)) AS precio,listamarcas.NOMBRE AS marca,listaautos.TITULO AS auto FROM produsqls INNER JOIN listamarcas ON produsqls.lista = listamarcas.CODIGO INNER JOIN listaautos ON produsqls.auto = listaautos.LI'

module.exports ={
    queryAllProducts
}

// Poner todas las querys en un array de objetos