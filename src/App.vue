<template>
  <div id="app">
    <app-header></app-header>
    <router-view :key="$route.fullPath"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import CART_STORAGE_KEY from "@/store";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  created: function() {
    this.$store.dispatch("fetchCategories");
    const cartString = localStorage.getItem(CART_STORAGE_KEY);
    if (cartString) {
      const shoppingCart = JSON.parse(cartString);
      this.$store.commit("SET_CART", shoppingCart);
    }
  }
};
</script>

<style>
body {
  font: 1em normal Arial, serif;
  color: #111111;
  font-size: 25px;
  text-align: center;
  margin: 20px;
}

main {
  background: #708090;
  display: flex;
  flex-direction: column;
}

a,
a:visited,
input[type="submit"] {
  color: white;
}

a:hover,
a:active,
input[type="submit"]:hover,
ul.buttons a:hover {
  color: brown;
}
</style>
