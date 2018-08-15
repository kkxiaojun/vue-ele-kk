<template>
  <div>
    <header class="head_top">
      <span class="head_logo">ele</span>
      <a class="head_login">登录|注册</a>
    </header>
  </div>
</template>
<script>
export default {
  name: "header",
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
}
</style>

