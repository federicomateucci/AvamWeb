<template>
  <section class="src-components-productos-customer">
    <header class="masthead text-white text-center">
      <div class="overlay" />
      <div class="container">
        <div class="row">
          <div class="col-xl-9 mx-auto">
            <h1 class="titulo mb-5"></h1>
          </div>
          <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <form>
              <div class="form-row">
                <div class="col-12 col-md-9 mb-2 mb-md-0">
                  <!-- <input
                    v-model="criterioBusqueda"
                    type="text"
                    class="form-control form-control-lg busqueda"
                    placeholder="Busque Por Nombre de Auto ej : FIAT-600"
                  /> -->
                
                    <select v-model="selected">
                      <option disabled value="">Selecciona Una Marca</option>
                      <option v-for="marca in mydata" :key="marca">{{marca.marca}}</option>
                    </select>
                    <div v-if="selected !== ''" >

                    <select v-model="criterioBusqueda">
                      <option  v-for="chevy in returnList(selected)" :key="chevy">{{chevy}}</option>
                    </select>
                    </div>
                  
                </div>
                <!-- <div class="col-12 col-md-3">
                  <button type="submit" class="btn btn-block btn-lg btn-info">
                    Buscar
                  </button>
                </div> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
    <div class="container mt-5">
      <!-- <div v-if="pedidoGenerado" class="alert alert-info">
        <b>Su pedido fue generado exitosamente</b>
      </div> -->
      <!-- <div v-if="productosPedido.length > 0" class="row listaPedidos">
        <div class="card" style="width: 30rem">
          <div class="card-header card-header-pedido">Crear Pedido</div>
          <ul
            v-for="(itemPedido, index) in productosPedido"
            :key="index"
            class="list-group list-group-flush"
          >
            <li class="list-group-item">
              <span class="textItemProducto"
                ><span class="cantidadItemProd">{{ itemPedido.cantidad }}</span>
                {{ itemPedido.producto.marca }} -
                {{ agregarSignoPesos(itemPedido.producto.precio) }}
              </span>
              <i
                class="fas fa-minus-circle manito"
                style="color: red; float: right"
                @click="deleteProductoFromPedido(itemPedido.producto)"
              />
            </li>
          </ul>
          <button class="btn btn-success" @click="crearPedido()">
            Crear Pedido ({{ listaPedidosLength }})
          </button>
        </div>
      </div> -->
      
      <div v-if="isRequestLoading" class="d-flex justify-content-center">
        <div class="spinner-grow text-info mr-3" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <p class="lead">Cargando listado de Productos</p>
      </div>
      <div v-else class="table-responsive">
        <table class="table">
          <thead class="table-info">
            <tr>
              <th>ID Producto</th>
              <th>Marca</th>
              <th>Auto</th>
              <th>Descripcion</th>
              <th>Precio</th>
            </tr>
          </thead>

          <tbody class="bodyTable">
            <tr v-for="(item, index) in productosFiltrados" :key="index">
              <td>{{ item.productoid }}</td>
              <td>{{ item.marca }}</td>
              <td>{{ item.auto }}</td>
              <td>{{ item.descripcion }}</td>
              <td>{{ agregarSignoPesos(item.precio) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import jwt from "jsonwebtoken";
import filters from "../filters";
import myJson from "../mylist.json";

export default {
  name: "SrcComponentsProductosCustomer",
  mixins: [filters],
  props: [],
  
  
  data() {
    return {
      url: "http://localhost:3000/products/",
      urlPedidos: "http://localhost:3000/pedidos/",
      criterioBusqueda: "",
      isRequestLoading: false,
      //productos: [],
      productosPedido: [],
      pedidoGenerado: false,
      selected: "",
      mydata:myJson,
      
    };
  },
  computed: {
    productosFiltrados() {
      const productos = this.mostrarProducto;
      return productos.filter((producto) => {
        const registroCompleto = `${producto.auto}`;
        return registroCompleto
          .toUpperCase()
          .includes(this.criterioBusqueda.toUpperCase());
      });
    },
    listaPedidosLength() {
      return this.productosPedido.length;
    },

    mostrarProducto() {
      return this.$store.state.clientProducts;
    }
    
  
    
  },
  mounted: function () {
    this.getProductos();
  
  },
  methods: {
    returnList(selected){
      const array = []
      for (let index = 0; index < myJson.length; index++) {
       let element = myJson[index];
        if(element.marca == selected){
          for (let j = 0; j < element.values.length; j++) {
           console.log(element.values[j]);
            array.push(element.values[j])
            
          }
        }
        
      }
      return array

    },
    mostrarlista(){
      myJson.forEach(element => {
        console.log(element);
      });
    },
    async crearPedido() {
      const tokenDecoded = jwt.decode(localStorage.jwt);
      const userId = tokenDecoded.id;

      const pedido = {
        idCustomer: userId,
        productos: this.productosPedido,
      };

      try {
        const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.jwt}`,
          },
        };
        await this.axios.post(this.urlPedidos, pedido, config);
        this.productosPedido = [];
        this.pedidoGenerado = true;
      } catch (err) {
        console.log(err);
      }
    },

    async getProductos() {
      this.isRequestLoading = true;
      await this.$store.dispatch("getClienteProducts");
      this.isRequestLoading = false;
    },
    agregarProductoAlPedido(producto) {
      const fromArray = this.productosPedido.find(
        (itemPedido) => itemPedido.producto.productoid === producto.productoid
      );
      if (fromArray) {
        fromArray.cantidad++;
      } else {
        const itemPedido = {
          // usuario: "obtenerUsuarioPosta",
          cantidad: 1,
          producto,
        };
        this.productosPedido.push(itemPedido);
        this.pedidoGenerado = false;
      }
    },
    deleteProductoFromPedido(producto) {
      const fromArray = this.productosPedido.find(
        (itemPedido) => itemPedido.producto.productoid === producto.productoid
      );
      if (fromArray) {
        if (fromArray.cantidad === 1) {
          const indexForRemoval = this.productosPedido.indexOf(fromArray);
          this.productosPedido.splice(indexForRemoval, 1);
        } else {
          fromArray.cantidad--;
        }
      }
    },
  },
};
</script>

<style scoped lang="css">
.bodyTable {
  overflow: auto;
  overflow-x: auto;
}
.table-responsive {
  width: 100%;
  max-height: 600px;
  margin-bottom: 15px;
  /* overflow-y: scroll;
    overflow-x: scroll; */
  -ms-overflow-style: -ms-autohiding-scrollbar;
  border: 1px solid #ddd;
  -webkit-overflow-scrolling: touch;
}

.table-responsive > .table {
  margin-bottom: 0;
  /* overflow-y: scroll;
    overflow-x: scroll; */
}

.table-responsive > .table > thead > tr > th,
.table-responsive > .table > tbody > tr > th,
.table-responsive > .table > tfoot > tr > th,
.table-responsive > .table > thead > tr > td,
.table-responsive > .table > tbody > tr > td,
.table-responsive > .table > tfoot > tr > td {
  white-space: nowrap;
}
.titulo {
  margin-left: 120px;
  text-align: left;
  font-weight: bold;
  font-size: 45px;
  color: rgb(49, 48, 48);
  text-shadow: 0 1px 0 #ddd, 0 2px 0 #ccc, 0 3px 0 #bbb, 0 4px 0 #aaa,
    0 5px 0 #acacac, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
}

header.masthead {
  position: relative;
  background-color: black;
  background: url(../assets/autoPartes2-1.jpg) no-repeat center center;
  background-size: cover;
  padding-top: 3rem;
  padding-bottom: 3rem;
  opacity: 0.9;
}
.container {
  max-width: 1800px !important;
}

.listaPedidos {
  float: right;
  padding: 0;
  margin-left: 5px;
  margin-right: 2px;
}

.textItemProducto {
  letter-spacing: 5px;
}

.cantidadItemProd {
  padding-left: 6px;
  text-align: center;
  margin: 0px;
  color: white;
  -webkit-text-stroke: 2px white;
  box-shadow: 1px 2px 2px 4px #87f137b5;
  margin-right: 7px;
}

.card-header-pedido {
  background-color: #275432;
  color: white;
  box-shadow: 2px 2px 2px grey;
}

.manito {
  cursor: pointer;
}
</style>
