<template>
   <div class="hello">
      <h1>{{ msg }}</h1>
      <p>Probando ELECTRON JS APP</p>
      <button type="button" class="btn btn-primary" @click="getGastos()">Datos</button>

          <table>
         <tr>
            <th>Codigo</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>auto</th>
            <th>lista</th>
         </tr>
         <tr v-for="(item, index) in listaPrecios" :key="index">
            <td>{{ item.productoid }}</td>
            <td>{{ item.descripcion }}</td>
            <td>{{ item.venta}}</td>
            <td>{{ item.auto }}</td>
            <td>{{ item.lista }}</td>
         </tr>
      </table> 
      <div class="overflow-auto">
         <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>

         <p class="mt-3">Current Page: {{ currentPage }}</p>

         <b-table id="my-table" :listaPrecios="listaPrecios" :per-page="perPage" :current-page="currentPage" small></b-table>
      </div>
   </div>
</template>

<script>
import exceldata from "../../excelToJson";

export default {
   name: "HelloWorld",
   props: {
      msg: String,
   },
   mounted() {
      this.getGastos();
   },
   data() {
      return {
         perPage: 50,
         currentPage: 1,
         url: "http://localhost:3000/products/",
         listaPrecios: [],
      };
   },
   methods: {
      async getLista() {
         console.log("antes de datos");
         this.listaPrecios = await exceldata.extraerDatos();
      },
      async getGastos() {
         try {
            console.log("en get gastos");
            let res = await this.axios(this.url);
            console.log("dps de axios");
            this.listaPrecios = res.data;
            console.log(this.listaPrecios[0]);
         } catch (error) {
            console.log("ERROR GET HTTP", error);
         }
      },
   },
   computed: {
      rows() {
         return this.listaPrecios.length;
      },
   },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
   margin: 40px 0 0;
}
ul {
   list-style-type: none;
   padding: 0;
}
li {
   display: inline-block;
   margin: 0 10px;
}
a {
   color: #42b983;
}
</style>
