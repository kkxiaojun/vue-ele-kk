<template>
  <div>
    <header class="head_top">
      <slot name="logo"></slot>  
      <!-- <span class="head_logo">guoguo</span> -->
      <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <section class="head_title ellipsis" v-if="headTitle">
        <span class="title_text">{{headTitle}}</span>
      </section>
      <section v-if="!signUp">
        <router-link to="/login" class="head_login" >登录|注册</router-link>
      </section>
    </header>
  </div>
</template>
<script>
export default {
  name: "headtop",
  props: {
    goBack: {
      type: Boolean,
      required: true
    },
    signUp: [Boolean, String],
    headTitle: {
      type: String
    }
  },
  data() {
    return {
      title: "header"
    };
  },
  created() {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
.head_top {
  position: fixed;
  left: 0;
  top: 0;
  @include wh(100%, 1.95rem);
  z-index: 100;
  background-color: $blue;
  .head_goback {
    left: 0.4rem;
    @include wh(0.6rem, 1rem);
    line-height: 2.2rem;
    margin-left: 0.4rem;
  }
  .head_logo {
    left: 0.4rem;
    @include ct;
    @include sc(0.7rem, $fc);
  }
  .head_login {
    right: 0.5rem;
    @include ct;
    @include sc(0.7rem, $fc);
  }
  .head_title{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text{
      @include sc(0.8rem, #fff);
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>

