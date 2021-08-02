import Vue from "vue";
import Vuex from "vuex";
import ApiService from "@/services/ApiService";
import { ShoppingCart } from "@/models/ShoppingCart";

Vue.use(Vuex);

export const CART_STORAGE_KEY = "cart";
export const ORDER_DETAIL_STORAGE_KEY = "orderDetails";

export default new Vuex.Store({
  state: {
    categories: [],
    selectedCategoryName: "Interior Design",
    selectedCategoryBooks: [],
    cart: new ShoppingCart(),
    orderDetails: null
  },
  mutations: {
    SET_CATEGORIES(state, newCategories) {
      state.categories = newCategories;
    },

    SELECT_CATEGORY(state, categoryName) {
      state.selectedCategoryName = categoryName;
    },

    SET_SELECTED_CATEGORY_BOOKS(state, books) {
      state.selectedCategoryBooks = books;
    },

    ADD_TO_CART(state, book) {
      state.cart.addItem(book, 1);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.state.cart));
    },

    UPDATE_CART(state, { book, quantity }) {
      state.cart.update(book, quantity);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.state.cart));
    },

    SET_CART(state, shoppingCart) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(shoppingCart));
      let newCart = new ShoppingCart();
      shoppingCart.items.forEach(item => {
        newCart.addItem(item.book, item.quantity);
      });
      state.cart = newCart;
    },

    CLEAR_CART(state) {
      localStorage.removeItem(CART_STORAGE_KEY);
      state.cart.clear();
    },

    SET_ORDER_DETAILS(state, orderDetails) {
      state.orderDetails = orderDetails;
      sessionStorage.setItem(
        ORDER_DETAIL_STORAGE_KEY,
        JSON.stringify(orderDetails)
      );
    },

    CLEAR_ORDER_DETAILS(state) {
      sessionStorage.removeItem(ORDER_DETAIL_STORAGE_KEY);
      state.orderDetail = null;
    }
  },
  actions: {
    fetchCategories(context) {
      ApiService.fetchCategories()
        .then(categories => {
          context.commit("SET_CATEGORIES", categories);
        })
        .catch(reason => {
          console.log("Error: " + reason);
        });
    },

    selectCategory(context, categoryName) {
      context.commit("SELECT_CATEGORY", categoryName);
    },

    fetchSelectedCategoryBooks(context) {
      ApiService.fetchSelectedCategoryBooks(context.state.selectedCategoryName)
        .then(books => {
          context.commit("SET_SELECTED_CATEGORY_BOOKS", books);
        })
        .catch(reason => console.log("Error: " + reason));
    },

    addToCart(context, book) {
      context.commit("ADD_TO_CART", book);
    },

    updateCart(context, updateDetails) {
      context.commit("UPDATE_CART", updateDetails);
    },
    placeOrder({ commit, state }, customerForm) {
      commit("CLEAR_ORDER_DETAILS");

      return ApiService.placeOrder({
        cart: state.cart,
        customerForm: customerForm
      }).then(orderDetails => {
        commit("CLEAR_CART");
        commit("SET_ORDER_DETAILS", orderDetails);
      });
    },
    clearCart({ commit }) {
      commit("CLEAR_CART");
    }
  },
  getters: {
    defaultCategoryName() {
      return "Interior Design";
    },
    categoryName(state, getters) {
      return state.selectedCategoryName || getters.defaultCategoryName;
    }
  }
});
