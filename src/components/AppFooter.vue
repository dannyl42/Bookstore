<template>
  <footer>
    <div id="leftFooter">
      <router-link to="/">
        <img
          src="@/assets/images/site/Facebook.png"
          alt="Facebook"
          style="width:45px;height:45px;"
        />
      </router-link>
      <router-link to="/">
        <img
          src="@/assets/images/site/Twitter.png"
          alt="Twitter"
          style="width:45px;height:45px;"
        />
      </router-link>
      <router-link to="/">
        <img src="@/assets/images/site/Pinterest.png" alt="Pinterest" style="width:45px;height:45px;"
        />
      </router-link>
      <router-link to="/">
        <img
          src="@/assets/images/site/Instagram.png"
          alt="Instagram"
          style="width:45px;height:45px;"
        />
      </router-link>
      <router-link to="/">
        <img
          src="@/assets/images/site/Youtube.png"
          alt="Youtube"
          style="width:45px;height:45px;"
        />
      </router-link>
    </div>

    <div id="midFooter">
      Copyright &copy; 2020 Designer's Delight |
      <router-link to="/">Contact Information</router-link> |
      <router-link to="/">Directions</router-link>
    </div>

    <div id="rightFooter"></div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>

<style scoped>
footer {
  background: #a9a9a9;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#leftFooter {
  padding-top: 8px;
  padding-left: 6px;
  display: flex;
  justify-content: space-evenly;
  width: 275px;
}

#midFooter {
  font-size: 25px;
  text-align: center;
  padding: 15px;
}

#rightFooter {
  width: 150px;
}
</style>
