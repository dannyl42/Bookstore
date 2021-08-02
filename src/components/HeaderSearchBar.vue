<template>
  <form id="searchForm">
    <input id="searchBar" type="text" />
    <input
      id="searchIcon"
      type="image"
      :src="require('../assets/images/site/Search_icon.png')"
      alt="Search Icon"
      style="width:35px;height:35px;"
    />
  </form>
</template>

<script>
export default {
  name: "HeaderSearchBar"
};
</script>

<style scoped>
#searchBar {
  width: 325px;
  height: 30px;
  border: 3px solid #111111;
}

#searchForm {
  padding-left: 25px;
  display: flex;
  justify-content: center;
}

#searchIcon {
  padding-left: 3px;
}
</style>
