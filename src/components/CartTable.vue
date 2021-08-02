<template>
  <section id="cartContents" v-if="!cart.empty">
    <table border="1" cellpadding="3">
      <tr>
        <th>Book Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>

      <tr v-for="item in cart.items" :key="item.book.bookId">
        <div>{{ item.book.title }}</div>
        <td>{{ item.book.price | asDollarsAndCents }}</td>

        <div class="cartOperationArea">
          <section>
            <img
              src="../assets/images/site/cr-decrement-icon.png"
              alt="Decrement Quantity"
              width="30px"
              height="30px"
              @click="
                updateCart({ book: item.book, quantity: item.quantity - 1 })
              "
            />
          </section>

          <div>({{ item.quantity }})</div>

          <section>
            <img
              src="../assets/images/site/cr-increment-icon.png"
              alt="Increment Quantity"
              width="30px"
              height="30px"
              @click="
                updateCart({ book: item.book, quantity: item.quantity + 1 })
              "
            />
          </section>
        </div>

        <td>{{ item.total | asDollarsAndCents }}</td>
      </tr>
    </table>

    <button
      class="cartNavigationButton"
      v-if="!cart.empty"
      @click.stop.prevent="cart.clear"
    >
      Clear Cart
    </button>

    <ul id="cartTotals" v-if="!cart.empty">
      <li>
        Cart subtotal: <b>{{ cart.subtotal | asDollarsAndCents }}</b>
      </li>
      <li>
        Surcharge: <b> {{ cart.surcharge | asDollarsAndCents }}</b>
      </li>
      <li>
        Cart Total: <b> {{ cart.total | asDollarsAndCents }}</b>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "CartTable",
  methods: {
    ...mapActions(["updateCart"])
  },
  computed: {
    ...mapState(["cart"])
  }
};
</script>

<style>
#cartContents {
  margin-top: 20px;
  align-content: center;
  margin-bottom: 10px;
}
#cartTotals {
  display: flex;
  font-size: 25px;
  line-height: 150%;
  flex-direction: column;
  padding-bottom: 100px;
  padding-top: 30px;
  padding-right: 500px;
  justify-content: center;
  text-align: right;
}

.cartNavigationButton {
  width: 250px;
  border: 3px solid black;
  background: steelblue;
  color: white;
  margin: 20px 10px;
  padding: 8px 10px;
  font-size: 25px;
  text-align: center;
  text-decoration: none;
  line-height: 200%;
  cursor: pointer;
}

.cartNavigationButton:hover {
  background: darkslateblue;
  cursor: pointer;
  color: white;
}

#cartContents table {
  height: 60px;
  width: 80%;
  background: gainsboro;
  margin-left: 160px;
  margin-right: 100px;
  border: 1px solid black;
}

#cartContents td,
#cartContents th {
  border: 1px solid black;
  padding: 25px;
}

#cartContents td {
  text-align: right;
  font-size: 20px;
}

#cartContents th {
  padding-top: 12px;
  padding-bottom: 12px;
  color: black;
  margin: 0px auto 75px;
  width: 250px;
  background-color: lightsteelblue;
  text-align: center;
  font-size: 25px;
  border: 2px solid black;
  line-height: 150%;
}

#cartContents tr {
  border: 2px solid black;
  text-align: left;
}

section img {
  cursor: pointer;
}

.cartOperationArea {
  font-size: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
