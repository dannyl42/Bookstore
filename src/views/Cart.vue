<template>
  <div id="cart">
    <div id="cartStatusSection">
      <section v-if="cart.numberOfItems > 1">
        Your Shopping Cart Contains {{ cart.numberOfItems }} Books.
      </section>
      <section v-else-if="cart.numberOfItems === 1">
        Your Shopping Cart Contains {{ cart.numberOfItems }} Book.
      </section>
      <section v-else>Your Shopping Cart is Empty</section>
    </div>

    <br />

    <div id="cartSubtotalSection">
      <section v-if="cart.numberOfItems > 0">
        Your Subtotal Is: <b>{{ cart.subtotal | asDollarsAndCents }}</b>
      </section>
    </div>

    <section id="cartNavigationSection">
      <router-link
        class="continueNavigationButton"
        :to="{
          name: 'category',
          params: { name: $store.state.selectedCategoryName }
        }"
        >Continue Shopping</router-link
      >

      <router-link
        class="proceedNavigationButton"
        v-if="!cart.empty"
        :to="{ name: 'checkout' }"
        >Proceed To Checkout</router-link
      >
    </section>

    <cart-table />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CartTable from "@/components/CartTable";

export default {
  name: "Cart",
  components: {
    CartTable
  },
  methods: {
    ...mapActions(["updateCart"])
  },
  computed: {
    ...mapState(["cart"])
  }
};
</script>

<style scoped>
#cart {
  background: slategrey;
}
#cartStatusSection {
  font-size: 25px;
  padding-top: 100px;
}

#cartSubtotalSection {
  font-size: 25px;
}

#cartNavigationSection {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.continueNavigationButton {
  width: 200px;
  border: 3px solid black;
  background: steelblue;
  color: white;
  margin: 20px 10px;
  padding: 8px 16px;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  line-height: 250%;
  cursor: pointer;
}
.proceedNavigationButton {
  width: 220px;
  border: 3px solid gainsboro;
  background-color: black;
  color: white;
  margin: 20px 10px;
  padding: 8px 16px;
  text-align: center;
  font-size: 20px;
  line-height: 250%;
  cursor: pointer;
}
.proceedNavigationButton:hover {
  background: darkslateblue;
  cursor: pointer;
  color: white;
}

.continueNavigationButton:hover {
  background: darkslateblue;
  cursor: pointer;
  color: white;
}
</style>
