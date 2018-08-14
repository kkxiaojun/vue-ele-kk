<template>
  <div class="home">
    <header class="head_top">
      <span class="head_logo">ele</span>
      <a class="head_login">登录|注册</a>
    </header>
    <nav class="city_nav">
      <div class="cuty_tip">{{guessCity}}</div>
      <a class="cur_city"><span class="arrow_right"></span></a>
    </nav>
  </div>
</template>

<script>
import { getCity } from "api/index";
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
        this.guessCity = res.data.name;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
