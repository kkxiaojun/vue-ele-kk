<template>
  <div class="login">
    <form action="" class="form">
      <div class="form_row">
        <input type="text" name="username" placeholder="用户名">
      </div>
      <div class="form_row">
        <input type="password" name="password" placeholder="密码">
      </div>
      <div class="form_row">
        <input type="text" name="valide" placeholder="验证码">
        <div class="check_code_container">
          <img src="" alt="img">
          <div class="img_change">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </div>
    </form>
    <p class="login_tips">温馨提示：未注册的用户登录时将自动注册</p>
    <p class="login_tips">已注册的用户可直接登录</p>
    <div class="login_btn">
      <span>登陆</span>
    </div>
    <router-link to="/forget" class="login_forget">忘记密码</router-link>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
.login {
  padding-top: 1.7rem;
  p,span,input {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
  .form {
    background-color: #fff;
    .form_row {
      @include fj;
      padding: 0.6rem 0.8rem;
      border-bottom: 1px solid #f1f1f1;
      input {
        @include sc(0.7rem, #666);
      }
      .check_code_container{
        @include fj;
        img{
          @include wh(3.5rem, 1.5rem);
          margin-right: 0.2rem;
        }
        .img_change{
          @include sc(0.5rem, #666);
          p:nth-of-type(2){
            color: $blue;
          }
        }
      }
    }
  }
  .login_tips {
    @include sc(0.5rem, #eb2626);
    padding: 0.4rem 0.6rem;
    line-height: 0.5rem;
  }
  .login_btn{
    text-align: center;
    margin: 0 .5rem 1rem;
    padding: 0.2rem 0;
    background-color: #4cd964;
    border: 1px solid #4cd964;
    @include borderRadius(0.15rem);
    span{
      @include sc(0.7rem, #fff);
    }
  }
  .login_forget{
    float: right;
    @include sc(0.6rem, $blue);
    margin-right: 0.7rem;
  }
}
</style>

