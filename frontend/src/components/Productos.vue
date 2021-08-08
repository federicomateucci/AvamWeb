<template>
  <section v-if="isAdmin" class="src-components-productos px-5">
    <div class="mt-5 mb-2" style="float: left">
        <input
          v-model="criterioBusqueda"
          type="text"
          class="form-control size"
          placeholder="Ingrese una marca.."
        />
      </div>

      <div class="mt-5 mb-2" style="float: right">
        <button class="btn btn-success" @click="addProducto()">
          Agregar producto
        </button>
      </div>
    <div class="table-responsive">
      
      
 

      <table v-if="productosFiltrados.length > 0" class="table" >
        <thead>
          <tr class="table-info" id="tableinfo">
            <th>ProductoId</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Auto</th>
            <th>Lista</th>
            
          </tr>
        </thead>
        <tbody class="bodyTable">
          <tr v-for="(producto, index) in productosFiltrados" :key="index">
            <td>{{ producto.productoid }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ agregarSignoPesos(producto.venta) }}</td>
            <td>{{ producto.auto }}</td>
            <td>{{ producto.lista }}</td>
            <!-- <td>
              <i
                class="fas fa-minus-circle manito"
                style="color: red"
                @click="deleteProduct(producto)"
              />
            </td>
            <td>
              <i
                class="fas fa-edit manito"
                @click="editarProducto(producto.productoid)"
              />
            </td> -->
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>ProductoId</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Auto</th>
            <th>Lista</th>
          </tr>
        </tfoot>
      </table>
      </div>
      


    <div
      v-if="isRequestLoading"
      class="spinner-border text-primary mt-2"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="!isAdmin" class="alert alert-warning">
      No tenes permisos para acceder a este recurso
    </div>
  </section>
</template>

<script>
import filters from "../filters";
import miMixins from "../miMixins";
import jwt from "jsonwebtoken";

export default {
  name: "SrcComponentsProductos",
  mixins: [filters, miMixins],
  props: [],
  data() {
    return {
      productoEliminado: "",
      // productos: this.$store.state.productos,
      url: "http://localhost:3000/productos/listaCompleta",
      criterioBusqueda: "",
      isRequestLoading: false,
      isAdmin: false,
      page: 1,
      loading: false,
      perPage : 20,
      repositories:[]
    };
  },
  computed: {
    productosFiltrados() {
      let productos = this.mostrarproducto
    //   let start = (this.page - 1) * this.perPage
    //   let end = start + this.perPage
    //  this.loading = false
      return productos.filter(producto => {
        const registroCompleto = `${producto.lista}`;
        
        
     return registroCompleto.toLowerCase().includes(this.criterioBusqueda.toLowerCase());
      })
    },
  
  //   showRepos () {
  //   let start = (this.page - 1) * this.perPage
  //   let end = start + this.perPage
  //   this.loading = false
  //   return this.repositories.slice(start, end)
  // }

mostrarproducto(){
  return this.$store.state.productos
}
  },

  mounted: function () {
    this.getDatosForm();
    this.chequearAdmin();
 
  },
  methods: {
  
  
    // pedido de los datos almacenados en el backend - GET
    getDatosForm() {
     this.$store.dispatch("getProductosAxios") ;
    },

    chequearAdmin() {
      const tokenDecoded = jwt.decode(localStorage.jwt);
      if (tokenDecoded) {
        const { rol } = tokenDecoded;
        this.isAdmin = rol == "admin";
        // console.log(this.isAdmin);
      }
    },

    addProducto() {
      this.$router.push("/altaproducto");
    },

    // acá falta hacerlo con async await y try catch

    async deleteProduct(producto) {
      if (
        confirm(
          `Esta seguro que desea eliminar el producto: "${producto.descripcion}" ?`
        )
      ) {
        try {
          this.isRequestLoading = true;
          await this.axios.delete(this.url + producto.productoid, {
            headers: {
              Authorization: `Bearer ${localStorage.jwt}`,
            },
          });
          await this.getDatosForm();
          // console.log(res.data.mensaje);
          this.isRequestLoading = false;
        } catch (err) {
          this.isRequestLoading = false;
          console.log(err);
        }
      }
    },

    editarProducto(productoid) {
      this.$router.push({
        name: "ModificarProducto",
        params: {
          productoid,
        },
      });
    },
        rows(){
    return this.productosFiltrados()
    }

  },
}

</script>

<style scoped lang="css">
.bodyTable{
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

.table-responsive>.table { 
    margin-bottom: 0;
      /* overflow-y: scroll;
    overflow-x: scroll; */
}

.table-responsive>.table>thead>tr>th, 
.table-responsive>.table>tbody>tr>th, 
.table-responsive>.table>tfoot>tr>th, 
.table-responsive>.table>thead>tr>td, 
.table-responsive>.table>tbody>tr>td, 
.table-responsive>.table>tfoot>tr>td {
    white-space: nowrap;
}

.toRight {
  float: right;
}

.size {
  width: 500px;
}

.manito:hover {
  cursor: pointer;
}

button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}
.offset {
  width: 500px !important;
  margin: 20px auto;
}
.pagination-button {
  padding: 5px;
  margin: 2px;
  border-radius:3px;
  font-size: 0.8em;
  cursor: pointer;
 
  justify-content: center;
  align-items: center;
}
</style>
