<template>
  <div>
    <section class="checkoutEmpty" v-if="cart.empty">
      <p>
        Your cart is empty. Please add an item to your cart to proceed to
        checkout.
      </p>
      <router-link
        class="continueNavigationButton"
        :to="{
          name: 'category',
          params: { name: $store.state.selectedCategoryName }
        }"
        >Continue Shopping</router-link
      >
    </section>

    <section class="categoryView" v-if="!cart.empty">
      <p style="font-size:30px"><strong>Checkout</strong></p>

      <div id="checkoutForm">
        <div id="checkoutFormBox">
          <form
            v-on:submit.prevent="submitOrder"
            v-on:reset="resetOrder"
            method="post"
          >
            <div class="form-element">
              <label for="name">Name</label>
              <input
                type="text"
                size="20"
                id="name"
                name="name"
                v-model.lazy="$v.name.$model"
              />
            </div>
            <template v-if="$v.name.$error">
              <div class="error" v-if="!$v.name.required">Name is required</div>
              <div class="error" v-else-if="!$v.name.minLength">
                Name must have at least
                {{ $v.name.$params.minLength.min }} letters.
              </div>
              <div class="error" v-else-if="!$v.name.maxLength">
                Name can have at most
                {{ $v.name.$params.maxLength.max }} letters.
              </div>
              <div class="error" v-else>An unexpected error occurred.</div>
            </template>

            <div class="form-element">
              <label for="address">Address</label>
              <input
                type="text"
                size="20"
                id="address"
                name="address"
                v-model.lazy="$v.address.$model"
              />
            </div>
            <template v-if="$v.address.$error">
              <div class="error" v-if="!$v.address.required">
                Address is required
              </div>
              <div class="error" v-else-if="!$v.address.minLength">
                Address must have at least
                {{ $v.address.$params.minLength.min }} characters.
              </div>
              <div class="error" v-else-if="!$v.address.maxLength">
                Address can have at most
                {{ $v.address.$params.maxLength.max }} characters.
              </div>
              <div class="error" v-else>An unexpected error occured.</div>
            </template>

            <div class="form-element">
              <label for="phone">Phone</label>
              <input
                class="textField"
                type="text"
                size="20"
                id="phone"
                name="phone"
                v-model.lazy="$v.phone.$model"
              />
            </div>
            <template v-if="$v.phone.$error">
              <div class="error" v-if="!$v.phone.required">
                Phone is required.
              </div>
              <div class="error" v-else-if="!$v.phone.phone">
                Please enter a valid phone number.
              </div>
              <div class="error" v-else>An unexpected error occurred.</div>
            </template>

            <div class="form-element">
              <label for="email">Email</label>
              <input
                type="text"
                size="20"
                id="email"
                name="email"
                v-model.lazy="$v.email.$model"
              />
            </div>
            <template v-if="$v.email.$error">
              <div class="error" v-if="!$v.email.required">
                Email is required.
              </div>
              <div class="error" v-else-if="!$v.email.email">
                Please enter a valid email address.
              </div>
              <div class="error" v-else>An unexpected error occurred.</div>
            </template>

            <div class="form-element">
              <label for="ccNumber">Credit card</label>
              <input
                type="text"
                size="20"
                id="ccNumber"
                name="ccNumber"
                v-model.lazy="$v.ccNumber.$model"
              />
            </div>
            <template v-if="$v.ccNumber.$error">
              <div class="error" v-if="!$v.ccNumber.required">
                Credit Card is required.
              </div>
              <div class="error" v-else-if="!$v.ccNumber.creditCard">
                Please enter a valid credit card number.
              </div>
              <div class="error" v-else>An unexpected error occurred.</div>
            </template>

            <div class="expDate">
              Exp Date:
              <div>
                <label></label>
                <select v-model="ccExpiryMonth">
                  <option
                    v-for="(month, index) in months"
                    :key="index"
                    :value="index + 1"
                    >{{ month }} ({{ index + 1 }})</option
                  >
                </select>
              </div>

              <div>
                <label></label>
                <select v-model="ccExpiryYear">
                  <option
                    v-for="index in 16"
                    :key="index"
                    :value="yearFrom(index - 1)"
                    >{{ yearFrom(-1) + index }}
                  </option>
                </select>
              </div>
            </div>

            <div id="checkoutButtonArea">
              <input
                id="submitButton"
                type="submit"
                name="submit"
                :disabled="checkoutStatus == 'PENDING'"
                value="Complete Purchase"
              />
              <input
                id="resetButton"
                type="reset"
                @click="resetOrder"
                value="Reset Form"
              />
            </div>
          </form>
        </div>

        <div id="checkoutInfo">
          <span
            >Your credit card will be charged a total of
            <strong
              >{{
                (cart.subtotal + cart.surcharge) | asDollarsAndCents
              }}.</strong
            ></span
          >
          <br />
          <span
            ><strong> ({{ cart.subtotal | asDollarsAndCents }} </strong></span
          >
          +
          <span>
            <strong> {{ cart.surcharge | asDollarsAndCents }} </strong> Shipping
            and Handling)</span
          >
        </div>

        <section v-show="checkoutStatus !== ''" class="checkoutStatusBox">
          <template v-if="checkoutStatus === 'ERROR'">
            <div class="formText formErrorText">
              Error: Please fix the problems above and try again.
            </div>
          </template>

          <template v-else-if="checkoutStatus === 'PENDING'">
            <div class="formText formPendingText">
              Processing...
            </div>
          </template>

          <template v-else-if="checkoutStatus === 'OK'">
            <div class="formText formOkText">Order placed...</div>
          </template>

          <template v-else-if="checkoutStatus === 'SERVER_ERROR'">
            <div class="formText formErrorText">
              An unexpected error occurred, please try again.
            </div>
          </template>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

import isCreditCard from "validator/lib/isCreditCard";
import isMobilePhone from "validator/lib/isMobilePhone";

const phone = value => isMobilePhone(value, "en-US");
const creditCard = value => isCreditCard(value);

export default {
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      email: "",
      ccNumber: "",
      ccExpiryMonth: new Date().getMonth() + 1,
      ccExpiryYear: new Date().getFullYear(),
      checkoutStatus: ""
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(45)
    },
    address: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(45)
    },
    phone: {
      required,
      phone
    },
    email: {
      required,
      email: email
    },
    ccNumber: {
      required,
      creditCard
    }
  },

  computed: {
    cart() {
      return this.$store.state.cart;
    },
    months() {
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    }
  },

  methods: {
    resetOrder() {
      console.log("Reset Order");
      this.$v.$reset();
      this.checkoutStatus = "";
    },
    submitOrder() {
      console.log("Submit order");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.checkoutStatus = "ERROR";
      } else {
        this.checkoutStatus = "PENDING";
        this.$store
          .dispatch("placeOrder", {
            name: this.name,
            address: this.address,
            phone: this.phone,
            email: this.email,
            ccNumber: this.ccNumber,
            ccExpiryMonth: this.ccExpiryMonth,
            ccExpiryYear: this.ccExpiryYear
          })
          .then(() => {
            this.checkoutStatus = "OK";
            this.$router.push({ name: "confirmation" });
          })
          .catch(reason => {
            this.checkoutStatus = "SERVER_ERROR";
            console.log("Error placing order", reason);
          });
      }
    },
    yearFrom(index) {
      return new Date().getFullYear() + index;
    }
  }
};
</script>

<style scoped>
.categoryView {
  display: flex;
  flex-direction: column;
  align-self: center;
  padding-top: 30px;
  margin-bottom: 30px;
  background: slategrey;
  text-align: center;
}

.categoryView input {
  margin-top: 15px;
  margin-right: 80px;
  line-height: 30px;
}

#checkoutButtonArea {
  display: flex;
  flex-direction: row;
  padding-top: 30px;
  padding-left: 180px;
}

#checkoutInfo {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 25px;
}

#submitButton {
  width: 220px;
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

#submitButton:hover {
  background: darkslateblue;
  cursor: pointer;
  color: white;
}

#resetButton {
  width: 220px;
  border: 3px solid black;
  background: steelblue;
  color: white;
  margin: 20px 10px;
  padding: 8px 16px;
  font-size: 20px;
  text-align: center;
  line-height: 250%;
  cursor: pointer;
}

#resetButton:hover {
  background: darkslateblue;
  cursor: pointer;
  color: white;
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

.continueNavigationButton:hover {
  background: darkslateblue;
  cursor: pointer;
  color: white;
}

#checkoutForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 20px;
}

#checkoutFormBox {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 30px;
  padding: 10px;
}

.form-element label {
  display: inline-block;
  text-align: left;
  padding: 8px;
  font-size: 30px;
  margin-left: 75px;
}

.form-element {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
}

.expDate label {
  display: inline-block;
  text-align: left;
  font-size: 30px;
  padding: 8px;
}

.expDate {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-evenly;
  font-size: 30px;
}

.expDate select {
  margin-top: 10px;
  margin-right: 10px;
}

form > .error {
  margin: 3px;
  color: darkred;
  text-align: right;
  font-style: italic;
}

.formText {
  text-align: center;
}

.formErrorText {
  font-style: italic;
  font-size: 25px;
  color: darkred;
}

.formPendingText {
  font-size: 25px;
  color: orange;
}

.formOkText {
  font-size: 25px;
  color: blue;
}

.checkoutStatusBox {
  margin: 1em;
  padding: 1em;
  text-align: center;
}
</style>
