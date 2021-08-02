<template>
  <div id="header">
    <div class="leftHeader">
      <div id="cartAndLogin">
        <div id="loginButton">
          <router-link to="/">
            <img src="@/assets/images/site/Login.png" alt="Login Icon" />
          </router-link>
          <div id="Login">Login</div>
        </div>

        <div id="cartButton">
          <router-link :to="{ name: 'cart' }">
            <img src="@/assets/images/site/Shopping_cart.png" alt="Cart Icon" />
            <div id="cartCount">{{ $store.state.cart.numberOfItems }}</div>
            <div id="Checkout">Checkout</div>
          </router-link>
        </div>
        <HeaderCategoryDropdown></HeaderCategoryDropdown>
      </div>
    </div>

    <div class="midHeader">
      <div id="logoText">
        <router-link to="/">
          <img
            src="@/assets/images/site/logoText.png"
            alt="My Bookstore Text"
          />
        </router-link>
      </div>
      <HeaderSearchBar></HeaderSearchBar>
    </div>

    <div class="rightHeader">
      <div id="storeLogo">
        <router-link to="/">
          <img
            src="@/assets/images/site/logo.png"
            alt="My Bookstore logo"
            style="width:230px;height:215px;"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSearchBar from "@/components/HeaderSearchBar";
import HeaderCategoryDropdown from "@/components/HeaderCategoryDropdown";
export default {
  name: "AppHeader",
  components: { HeaderSearchBar, HeaderCategoryDropdown },
  component: {
    HeaderSearchBar,
    HeaderCategoryDropdown
  }
};
</script>
<style>
#header {
  background: #a9a9a9;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.leftHeader {
  padding-left: 75px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#Login {
  color: white;
  font-size: 25px;
  padding-right: 10px;
}

#Checkout {
  color: white;
  font-size: 25px;
}

.midHeader {
  width: 500px;
  flex-direction: column;
  padding-right: 150px;
}

.rightHeader {
  width: 150px;
}

#storeLogo {
  padding-top: 30px;
  padding-right: 150px;
  display: flex;
  justify-content: space-around;
}

#cartAndLogin {
  display: flex;
  padding-top: 5px;
  justify-content: space-around;
}

#cartButton {
  position: relative;
  padding: 15px;
}

#loginButton {
  padding: 15px;
}

#cartCount {
  position: absolute;
  color: white;
  font-weight: bold;
  top: -5px;
  left: 75px;
  font-size: 35px;
}
</style>
