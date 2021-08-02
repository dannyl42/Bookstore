<template>
  <div id="home">
    <div id="leftHome">
      <p>
        Welcome to Designer's Delight Book Store
      </p>
      <p>Check out today's best <b>Seller.</b></p>

      <div id="bestSeller">
        <div class="bookImage">
          <router-link to="/">
            <img
              src="@/assets/images/books/homethefoundationsofenduringspaces.jpg"
              alt="Home Interior Design"
              style="height:260px; width:160px"
            />
          </router-link>
        </div>

        <div class="bookInfo">
          <ul class="bookTitle">
            Home: the Foundations of Enduring Spaces
          </ul>
          <ul class="bookAuthor">
            by Ellen S. Fisher
          </ul>
          <ul class="bookPrice">
            $44.42
          </ul>
        </div>
      </div>
    </div>

    <section>
      <div id="midHome">
        <p>
          Today's Featured
        </p>
        <p>Category:</p>

        <router-link
          class="featuredCategoryButton"
          :to="'category/Interior Design'"
          >Interior Design</router-link
        >

        <div class="bookImage">
          <router-link :to="'category/Interior Design'">
            <img
              src="@/assets/images/books/interiordesign.jpg"
              alt="Interior Design"
              style="height:280px; width: 180px"
            />
          </router-link>
        </div>
      </div>
    </section>

    <div id="rightHome">
      <div id="exploreButtons">
        <class id="menuButton">
          <router-link class="usedLink" to="/">Used Books</router-link>
        </class>
        <class id="menuButton">
          <router-link class="newLink" to="/">New Books</router-link>
        </class>
        <class id="menuButton">
          <router-link class="sellLink" to="/">Sell Books</router-link>
        </class>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/ApiService";

export default {
  name: "Home",
  data: function() {
    return {
      categories: []
    };
  },
  created: function() {
    console.log("Begin fetchCategories...");
    this.fetchCategories();
    console.log("End fetchCategories...");
  },
  methods: {
    fetchCategories() {
      const vm = this;
      ApiService.fetchCategories()
        .then(data => {
          console.log("Data: " + data);
          vm.categories = data;
        })
        .catch(reason => {
          console.log("Error: " + reason);
        });
    }
  }
};
</script>

<style>
#home {
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #708090;
}

#leftHome {
  padding-top: 50px;
  margin-bottom: 30px;
  font-size: 30px;
  line-height: 150%;
  display: flex;
  padding-right: 20px;
  flex-direction: column;
  justify-contents: space-around;
  color: white;
}

#bestSeller {
  padding-top: 40px;
}

.bookImage {
  padding-bottom: 20px;
}
.bookInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 2px solid black;
  color: white;
  padding: 10px;
  line-height: 150%;
}

.bookTitle {
  display: flex;
  text-align: left;
  flex-direction: column;
  color: white;
}

.bookAuthor {
  color: white;
}

.bookPrice {
  color: white;
}

#exploreButtons {
  padding-top: 60px;
  margin: 0px 20px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
}

#menuButton {
  margin: 0px auto 80px;
  width: 220px;
  height: 70px;
  background-color: black;
  color: white;
  text-align: center;
  font-size: 25px;
  border: 2px solid white;
  line-height: 250%;
}

#midHome {
  padding-right: 150px;
  padding-top: 75px;
  display: flex;
  flex-direction: column;
  font-size: 35px;
  color: white;
  line-height: 150%;
}

.featuredCategoryButton {
  margin: 40px auto 50px;
  width: 220px;
  height: 70px;
  background-color: black;
  color: white;
  text-align: center;
  font-size: 25px;
  border: 2px solid white;
  line-height: 250%;
}

.featuredCategoryButton:hover {
  background: darkslateblue;
  cursor: pointer;
  color: white;
}

#rightHome {
  padding-top: 75px;
  padding-right: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: white;
}

router-link {

}
</style>
