<template>
  <nav>
    <ul id="categoryButtons">
      <template v-for="category in $store.state.categories">
        <li
          :key="category.categoryId"
          v-if="$store.state.selectedCategoryName === category.name"
          class="categoryButton selectedCategoryButton"
        >
          {{ category.name }}
        </li>
        <li
          :key="category.categoryId"
          v-else
          class="categoryButton unselectedCategoryButton"
        >
          <router-link
            class="unselectedCategoryLink"
            :to="{ name: 'category', params: { name: category.name } }"
            >{{ category.name }} </router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "CategoryNav"
};
</script>

<style>
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
#categoryButtons {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  margin: 0px 20px;
  float: left;
  max-width: 250px;
}

.categoryButton {
  margin: 0px auto 75px;
  width: 250px;
  height: 70px;
  background-color: black;
  color: white;
  text-align: center;
  font-size: 25px;
  border: 2px solid white;
  line-height: 250%;
}

.selectedCategoryButton {
  background-color: darkgray;
  color: black;
  border: 4px solid white;
}

a:link
a:visited {
  color: white;
  text-decoration: none;
}

a:hover {
  color: darkviolet;
}
</style>
