<template>
  <div id="categoryView">
    <category-nav></category-nav>
    <category-book-list></category-book-list>
  </div>
</template>

<script>
import CategoryNav from "@/components/CategoryNav";
import CategoryBookList from "@/components/CategoryBookList";

export default {
  name: "category",
  components: {
    CategoryNav,
    CategoryBookList
  },

  created: function() {
    this.$store.dispatch("selectCategory", this.$route.params.name);
    this.$store.dispatch("fetchSelectedCategoryBooks");
  }
};
</script>

<style scoped>
#categoryView {
  display: flex;
  flex-direction: row;
  background: #708090;
}
</style>
