<template>
  <header class="head_top">
    <slot name="logo"></slot>
    <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2" />
      </svg>
    </section>
    <section class="head_title ellipsis" v-if="headTitle">
      <span class="title_text">{{headTitle}}</span>
    </section>
    <section v-if="!signUp">
      <router-link :to="userInfo ? '/profile' : '/login'" class="head_login">
        <svg class="user_avatar" v-if="userInfo">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
        </svg>
        <span class="login_text" v-else>登录|注册</span>
      </router-link>
    </section>
    <slot name="changeCity"></slot>
    <slot name="search"></slot>
    <slot name="msiteTitle"></slot>
  </header>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
	name: 'headtop',
	props: {
		goBack: {
			type: Boolean,
			required: true,
		},
		signUp: [Boolean, String],
		headTitle: {
			type: String,
		},
	},
	data() {
		return {
			title: 'header',
		}
	},
	computed: {
		...mapState(['userInfo']),
	},
	mounted() {
		// 获取用户信息
		this.getUserInfo()
	},
	methods: {
		...mapActions(['getUserInfo']),
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.head_top {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 100;
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
		.user_avatar {
			fill: #fff;
			@include wh(0.8rem, 0.8rem);
		}
		.login_text {
			color: #fff;
		}
	}
	.head_title {
		@include center;
		width: 50%;
		color: #fff;
		text-align: center;
		.title_text {
			@include sc(0.8rem, #fff);
			text-align: center;
			font-weight: bold;
		}
	}
}
</style>

