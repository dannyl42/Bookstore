<template>
  <div class="bookBox">
    <ul bookBlock>
      <img
        class="bookImage"
        :src="require('@/assets/images/books/' + imageFile(book))"
        :alt="book.title"
      />

      <div class="bookInfo">
        <h1>{{ book.title }}</h1>
        <h2>{{ book.author }}</h2>
        <h3>${{ (book.price / 100).toFixed(2) }}</h3>
      </div>

      <div class="bookButtons">
        <div class id="addButton">
          <div class="addToCartButton" @click="addToCart(book)">
            Add to Cart
          </div>
        </div>
        <div class id="readButton" v-if="book.isPublic">
          <router-link class="readNow" :to="{ name: 'cart' }">
            Read Now</router-link
          >
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "categoryBookListItem",
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    imageFile: function(book) {
      let name = book.title.toLowerCase();
      name = name.replace(/ /g, "");
      name = name.replace(/:/g, "");
      name = name.replace(/'/g, "");
      name = name.replace(/,/g, "");
      name = name.replace(/--/g, "-");
      name = name.replace(/ /g, "");
      return `${name}` + `.jpg`;
    },
    addToCart(book) {
      this.$store.dispatch("addToCart", book);
    }
  }
};
</script>

<style scoped>
.bookInfo {
  text-align: center;
  line-height: 110%;
  padding-bottom: 5px;
  color: black;
}

.bookImage {
  width: 120px;
  height: 150px;
}

.bookBox {
  display: flex;
  flex-direction: column;
  margin: 50px auto 0px;
  border: 4px solid gray;
  padding: 10px;
  width: 350px;
  height: 350px;
  text-align: center;
  background-color: white;
  font-size: 20px;
}

.bookButtons {
  margin: 10px auto 10px;
  height: 50px;
  border: 3px solid black;
  padding-top: 8px;
  display: flex;
  justify-content: space-around;
  line-height: 95%;
  background-color: gray;
}

#addButton {
  margin-bottom: 5px;
  width: 150px;
  padding: 8px;
  border: 3px solid gainsboro;
  background: steelblue;
  color: white;
}

#addButton:hover {
  background: darkslateblue;
  cursor: pointer;
}

#readButton:hover {
  background: darkslateblue;
  cursor: pointer;
  color: white;
}

.readNow {
  color: white;
}

#readButton {
  margin-bottom: 5px;
  width: 125px;
  padding: 8px;
  border: 3px solid gainsboro;
  background: steelblue;
}
</style>
