<template>
  <div class="login">
    <head-top :head-title="loginWay? '登录':'密码登录'" :sign-up="true" :go-back="true"></head-top>
    <form action="" class="form">
      <div class="form_row">
        <input type="text" v-model="user.username" name="username" placeholder="用户名">
      </div>
      <div class="form_row">
        <input type="password" v-model="user.password" name="password" placeholder="密码">
      </div>
      <div class="form_row">
        <input type="text" v-model="checkCodeNumber" name="valide" placeholder="验证码">
        <div class="check_code_container">
          <img :src="checkCodeBase64" alt="img">
          <div class="img_change">
            <p>看不清</p>
            <p @click="changeCodeImg">换一张</p>
          </div>
        </div>
      </div>
    </form>
    <p class="login_tips">温馨提示：未注册的用户登录时将自动注册</p>
    <p class="login_tips">已注册的用户可直接登录</p>
    <div class="login_btn" @click="loginTo">
      <span>登陆</span>
    </div>
    <router-link to="/forget" class="login_forget">忘记密码</router-link>
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
import { checkCode } from 'common/js/util'
import { getCheckCode, login } from 'api/index'
import { mapMutations } from 'vuex'
export default {
	data() {
		return {
			user: {
				username: '',
				password: '',
			},
			userInfo: null, // 用户信息
			loginWay: false, //登录方式，默认短信登录
			checkCodeBase64: null, // 验证码图片
			checkCodeNumber: null, // 验证码number
		}
	},
	created() {
		this.getCheckCode()
	},
	methods: {
		...mapMutations(['RECORD_USERINFO']),
		getCheckCode() {
			getCheckCode(res => {
				if (checkCode(res.status)) {
					this.checkCodeBase64 = res.data.code
				}
			})
		},
		changeCodeImg() {
			this.getCheckCode()
		},
		loginTo() {
			let params = {
				username: this.user.username,
				password: this.user.password,
				captcha_code: this.checkCodeNumber,
			}
			login(params, res => {
				if (checkCode(res.status)) {
					this.userInfo = res.data
					this.RECORD_USERINFO(res.data)
					this.$router.go(-1)
				} else {
					// 登录不成功处理
				}
			})
		},
	},
	components: {
		HeadTop,
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.login {
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
					margin-right: 0.4rem;
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
	.login_tips {
		@include sc(0.5rem, #eb2626);
		padding: 0.4rem 0.6rem;
		line-height: 0.5rem;
	}
	.login_btn {
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
	.login_forget {
		float: right;
		@include sc(0.6rem, $blue);
		margin-right: 0.7rem;
	}
}
</style>

