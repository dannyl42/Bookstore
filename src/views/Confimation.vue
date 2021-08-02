<template>
  <div id="confirmPage">
    <section v-if="!orderDetails" id="confirmationInvalid">
      <router-link
        class="continueNavigationButton"
        :to="{
          name: 'category',
          params: { name: $store.state.selectedCategoryName }
        }"
        >Continue Shopping</router-link
      >
    </section>
    <template v-else>
      <section id="confirmationView">
        <h1>Confirmation</h1>
        <p>
          Your confirmation number is
          {{ orderDetails.order.confirmationNumber }}
        </p>
        <p>{{ new Date($store.state.orderDetails.order.dateCreated) }}</p>
      </section>
      <section id="confirmationOrderDetails">
        <table id="orderDetailsTable">
          <tr>
            <th>Book Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          <tr
            v-for="(item, index) in this.$store.state.orderDetails.lineItems"
            :key="item.productId"
          >
            <td>{{ $store.state.orderDetails.books[index].title }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              {{
                (orderDetails.books[index].price * item.quantity)
                  | asDollarsAndCents
              }}
            </td>
          </tr>
          <tr>
            <td colspan="2">-- Surcharge --</td>
            <td>
              {{ cart.surcharge | asDollarsAndCents }}
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>Total:</strong>
            </td>
            <td>
              <strong>
                {{ orderDetails.order.amount | asDollarsAndCents }}
              </strong>
            </td>
          </tr>
        </table>
      </section>
      <section id="customerInformation">
        <h1><strong>Customer Information</strong></h1>
        <p>{{ orderDetails.customer.customerName }}</p>
        <p>{{ orderDetails.customer.address }}</p>
        <p>{{ orderDetails.customer.phone }}</p>
        <p>{{ orderDetails.customer.email }}</p>
        <p>
          {{
            $store.state.orderDetails.customer.ccNumber.replace(
              /\d(?=\d{4})/g,
              "X"
            )
          }}
        </p>
        <p>{{ $store.state.orderDetails.customer.ccExpiryYear }}</p>
      </section>
      <section id="confirmationContinue">
        <router-link
          class="continueNavigationButton"
          :to="{
            name: 'category',
            params: { name: $store.state.selectedCategoryName }
          }"
          >Continue Shopping</router-link
        >
      </section>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Confirmation",
  computed: {
    ...mapState(["orderDetails", "cart", "selectedCategoryName"]),
    ...mapGetters(["categoryName"])
  }
};
</script>

<style scoped>
#confirmPage {
  background: slategrey;
}

#confirmationView h1 {
  font-weight: bold;
  margin-top: 50px;
  font-size: 30px;
}
#confirmationView {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 25px;
  line-height: 150%;
}
#confirmationOrderDetails {
  display: flex;
  margin-top: 30px;
  justify-content: center;
}

#orderDetailsTable {
  text-align: center;
}

#customerInformation {
  text-align: center;
  display: block;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 300px;
  margin-right: 300px;
  font-size: 25px;
  background-color: gainsboro;
  border: 2px solid black;
  padding: 10px;
  line-height: 100%;
}

#customerDetails p:last-of-type {
  margin-bottom: 10px;
}

#customerDetails h1 {
  font-weight: bold;
  margin-top: 10px;
}

#confirmationContinue {
  display: flex;
  justify-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.continueNavigationButton {
  width: 220px;
  border: 3px solid black;
  background: steelblue;
  color: white;
  margin: 20px 10px;
  padding: 8px 16px;
  font-size: 25px;
  text-decoration: none;
  line-height: 220%;
  cursor: pointer;
}

.continueNavigationButton:hover {
  background: darkslateblue;
  cursor: pointer;
  color: white;
}

#orderDetailsTable {
  border: 2px solid black;
  background-color: gainsboro;
  font-size: 20px;
}

#orderDetailsTable th {
  font-weight: bold;
  background-color: lightsteelblue;
  font-size: 25px;
}

#orderDetailsTable td,
#orderDetailsTable th {
  padding: 10px;
}

#orderDetailsTable td {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

#confirmationInvalid {
  margin-top: 100px;
  margin-bottom: 100px;
  display: flex;
  justify-content: space-around;
}
</style>
