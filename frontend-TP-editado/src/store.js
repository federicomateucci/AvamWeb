import { createStore } from "vuex";
import axios from "axios";

const url = "http://localhost:3000/products";
const urlPedidos = "http://localhost:3000/pedidos/";
const urlProdCostumers = "http://localhost:3000/products/listaCompleta";

export default createStore({
  state() {
    return {
      productos: [],
      pedidos: [],
      clientProducts: [],
    };
  },
  actions: {
    async getClienteProducts({ commit }) {
      try {
        const response = await axios(urlProdCostumers, {
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`
          }
        });
        commit("guardarProductosCostumerMutation", response.data);
      } catch (err) {
        console.log("HTTP GET ERROR", err);
      }
    },
    async getProductosAxios({ commit }) {
      try {
        const response = await axios(url, {
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`
          }
        });
        commit("guardarProductosMutation", response.data);
      } catch (error) {
        console.log("HTTP GET ERROR", error);
        this.$router.push("/");
      }
    },

    async getPedidosAxios({ commit }) {
      try {
        const response = await axios(urlPedidos, {
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`
          }
        });
        commit("guardarPedidosMutation", response.data);
      } catch (error) {
        console.log("HTTP GET ERROR", error);
        this.$router.push("/");
      }
    }
  },

  mutations: {
    guardarProductosMutation(state, productos) {
      state.productos = productos;
    },
    guardarPedidosMutation(state, pedidos) {
      state.pedidos = pedidos;
    },
    guardarProductosCostumerMutation(state, productos) {
      state.clientProducts = productos;
    }
  }
});
