import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/css/normalize-and-reset.css";
import store, { CART_STORAGE_KEY, ORDER_DETAIL_STORAGE_KEY } from "./store";
import Vuelidate from "vuelidate";
import TreeView from "vue-json-tree-view";

import "@/assets/css/global.css";

Vue.config.productionTip = false;

// From https://flaviocopes.com/how-to-format-number-as-currency-javascript/
const PriceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

Vue.filter("asDollarsAndCents", function(cents) {
  if (!cents) return "?";
  return PriceFormatter.format(cents / 100.0);
});

Vue.use(Vuelidate);
Vue.use(TreeView);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const cartString = localStorage.getItem(CART_STORAGE_KEY);
    if (cartString) {
      const shoppingCart = JSON.parse(cartString);
      this.$store.commit("SET_CART", shoppingCart);
    }
    const orderDetailString = sessionStorage.getItem(ORDER_DETAIL_STORAGE_KEY);
    if (orderDetailString) {
      const orderDetailData = JSON.parse(orderDetailString);
      this.$store.commit("SET_ORDER_DETAILS", orderDetailData);
    }
  }
}).$mount("#app");
