<template>
  <div>
    <header class="head_top">
      <span class="head_logo">guoguo</span>
      <router-link to="/login" class="head_login" >登录|注册</router-link>
    </header>
  </div>
</template>
<script>
export default {
  name: "headertop",
  data() {
    return {
      title: "header"
    };
  },
  created() {}
};
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.head_top {
  position: fixed;
  left: 0;
  top: 0;
  @include wh(100%, 1.95rem);
  z-index: 100;
  background-color: $blue;
  .head_logo{
    left: 0.4rem;
    @include ct;
    @include sc(0.70rem, $fc);
  }
  .head_login{
    right: 0.50rem;
    @include ct;
    @include sc(0.70rem, $fc);
  }
}
</style>

