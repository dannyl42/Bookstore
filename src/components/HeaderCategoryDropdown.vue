<template>
  <div class="dropdown">
    <button class="dropBtn">Categories</button>
    <ul>
      <li
        :key="category.categoryId"
        v-for="category in $store.state.categories"
        class="dropdown"
      >
        <router-link
          :to="{ name: 'category', params: { name: category.name } }"
        >
          {{ category.name }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HeaderCategoryDropdown"
};
</script>

<style scoped>
.dropBtn {
  background: black;
  width: 150px;
  color: white;
  padding: 15px;
  font-size: 25px;
  border: 2px solid white;
}

.dropdown {
  position: relative;
  display: inline-block;
}

ul {
  display: none;
  position: absolute;
  background-color: gray;
  min-width: 250px;
  box-shadow: 0px 12px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

ul a {
  color: black;
  font-size: 20px;
  padding: 15px 20px;
  text-decoration: none;
  display: block;
}

ul a:hover {
  background-color: #dddddd;
  width: 200px;
}

.dropdown:hover ul {
  display: block;
}

.dropdown:hover ul {
  background-color: darkgray;
}
</style>
