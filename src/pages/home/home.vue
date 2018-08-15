<template>
  <div class="home">
    <head-top></head-top>
    <nav class="city_nav">
      <div class="city_tip">{{guessCity}}</div>
      <a class="cur_city"><span class="arrow_right"></span></a>
    </nav>
    <section class="hot_city_container"></section>
    <section class="list_city_container"></section>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import { getCity } from "api/index"
export default {
  name: "Home",
  data: function() {
    return {
      guessCity: "广州"
    };
  },
  created: function() {
    getCity("guess", res => {
      if (res.status === 200) {
        this.guessCity = res.data.name
      }
    });
  },
  components:{
    headTop
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~common/scss/mixin';
.home{
  .city_nav{
    padding-top: 1.91em;
  }
  .hot_city_container{

  }
  .list_city_container{

  }
}
</style>
