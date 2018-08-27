<template>
  <div class="forget">
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
          <img :src="1" alt="img">
          <div class="img_change">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </div>
    </form>
    <p class="forget_tips">温馨提示：未注册的用户登录时将自动注册</p>
    <p class="forget_tips">已注册的用户可直接登录</p>
    <div class="forget_btn">
      <span>确认重置</span>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.forget {
	padding-top: 1.7rem;
	p,
	span,
	input {
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
			.check_code_container {
				@include fj;
				img {
					@include wh(3.5rem, 1.5rem);
					margin-right: 0.2rem;
				}
				.img_change {
					@include sc(0.5rem, #666);
					p:nth-of-type(2) {
						color: $blue;
					}
				}
			}
		}
	}
	.forget_tips {
		@include sc(0.5rem, #eb2626);
		padding: 0.4rem 0.6rem;
		line-height: 0.5rem;
	}
	.forget_btn {
		text-align: center;
		margin: 0 0.5rem 1rem;
		padding: 0.2rem 0;
		background-color: #4cd964;
		border: 1px solid #4cd964;
		@include borderRadius(0.15rem);
		span {
			@include sc(0.7rem, #fff);
		}
	}
}
</style>

