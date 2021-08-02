<template>
  <ul id="bookList">
    <category-book-list-item
      v-for="book in $store.state.selectedCategoryBooks"
      v-bind:key="book.bookId"
      :book="book"
    />
  </ul>
</template>

<script>
import CategoryBookListItem from "@/components/CategoryBookListItem";

export default {
  name: "CategoryBookList",
  components: {
    CategoryBookListItem
  }
};
</script>

<style scoped>
#bookList {
  padding-top: 60px;
  padding-bottom: 50px;
  margin-right: 20px;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
