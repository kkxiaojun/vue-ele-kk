<template>
  <div class="login">
    <form action="" class="form">
      <div class="form_row">
        <label for="username">用户名</label>
        <input type="text" name="username">
      </div>
      <div class="form_row">
        <label for="password">密码</label>
        <input type="password" name="password">
      </div>
      <div class="form_row">
        <label for="valide">验证码</label>
        <input type="text" name="valide">
      </div>
    </form>
    <p>温馨提示：未注册的用户登录时将自动注册</p>
    <p>已注册的用户可直接登录</p>
    <div class="login_btn">
        <input type="button" value="登录" />
    </div>
    <router-link to="/forget">忘记密码</router-link>
  </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
.login{
  .form{
      margin-top: 2rem;
  }
}
</style>

